'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { api, EmbeddedSignupConfig } from '@/lib/api';

interface Props {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
  onConnected: () => void | Promise<void>;
}

interface SessionInfo {
  wabaId?: string;
  phoneNumberId?: string;
}

const SDK_SCRIPT_ID = 'facebook-jssdk';

// Loads the Facebook JS SDK once and initialises it with our app id. Resolves
// when window.FB is ready to use.
function loadFbSdk(appId: string, version: string): Promise<void> {
  return new Promise((resolve) => {
    const w = window as any;
    if (w.FB) {
      resolve();
      return;
    }

    w.fbAsyncInit = function () {
      w.FB.init({
        appId,
        autoLogAppEvents: true,
        xfbml: true,
        version,
      });
      resolve();
    };

    if (document.getElementById(SDK_SCRIPT_ID)) return; // already loading

    const js = document.createElement('script');
    js.id = SDK_SCRIPT_ID;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    js.async = true;
    js.defer = true;
    js.crossOrigin = 'anonymous';
    document.body.appendChild(js);
  });
}

export function EmbeddedSignupButton({ onSuccess, onError, onConnected }: Props) {
  const [config, setConfig] = useState<EmbeddedSignupConfig | null>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const sessionInfoRef = useRef<SessionInfo>({});

  // Fetch public ES config, then load the SDK if it's configured.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await api.getEmbeddedSignupConfig();
        if (cancelled) return;
        setConfig(res.config);
        if (res.config?.configured) {
          await loadFbSdk(res.config.appId, res.config.graphApiVersion);
          if (!cancelled) setSdkReady(true);
        }
      } catch {
        if (!cancelled) setConfig(null);
      } finally {
        if (!cancelled) setLoadingConfig(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Capture waba_id / phone_number_id that Meta posts during the popup flow.
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (!event.origin || !event.origin.includes('facebook.com')) return;
      try {
        const payload =
          typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (payload?.type !== 'WA_EMBEDDED_SIGNUP') return;
        // Meta sends different completion events per feature type:
        // FINISH, FINISH_ONLY_WABA, FINISH_WHATSAPP_BUSINESS_APP_ONBOARDING
        // (Coexistence), FINISH_OBO_MIGRATION, FINISH_GRANT_ONLY_API_ACCESS.
        // Capture the WABA from any finish event that provides one.
        if (
          typeof payload.event === 'string' &&
          payload.event.startsWith('FINISH') &&
          payload.data?.waba_id
        ) {
          sessionInfoRef.current = {
            wabaId: payload.data.waba_id,
            phoneNumberId: payload.data.phone_number_id,
          };
        }
      } catch {
        // Non-JSON messages from facebook are expected; ignore.
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  const completeSignup = useCallback(
    async (code: string) => {
      const { wabaId, phoneNumberId } = sessionInfoRef.current;
      if (!wabaId) {
        onError('Could not read your WhatsApp Business account. Please try again.');
        setConnecting(false);
        return;
      }
      try {
        const res = await api.embeddedSignup({ code, wabaId, phoneNumberId });
        if (res.success) {
          onSuccess('WhatsApp Business account connected successfully!');
          await onConnected();
        } else {
          onError(res.message || 'Failed to connect WhatsApp account');
        }
      } catch (err: any) {
        onError(err?.message || 'Failed to complete WhatsApp connection');
      } finally {
        setConnecting(false);
        sessionInfoRef.current = {};
      }
    },
    [onSuccess, onError, onConnected]
  );

  const handleLogin = useCallback(() => {
    const w = window as any;
    if (!config?.configured || !w.FB) return;
    setConnecting(true);
    sessionInfoRef.current = {};

    w.FB.login(
      (response: any) => {
        const code = response?.authResponse?.code;
        if (code) {
          completeSignup(code);
        } else {
          // User closed the popup or denied permissions.
          setConnecting(false);
        }
      },
      {
        config_id: config.configId,
        response_type: 'code',
        override_default_response_type: true,
        extras: {
          setup: {},
          featureType: config.featureType,
          sessionInfoVersion: '3',
        },
      }
    );
  }, [config, completeSignup]);

  if (loadingConfig) {
    return (
      <Button size="lg" disabled className="w-full sm:w-auto">
        Loading…
      </Button>
    );
  }

  // Not configured yet — guide the operator rather than failing silently.
  if (!config?.configured) {
    return (
      <div className="text-left">
        <Button size="lg" disabled className="w-full sm:w-auto">
          Connect WhatsApp Business
        </Button>
        <p className="text-xs text-amber-600 mt-2">
          Embedded Signup isn&apos;t configured. Set <code>WHATSAPP_ES_CONFIG_ID</code> (and{' '}
          <code>WHATSAPP_APP_ID</code>) on the server to enable one-click Coexistence onboarding.
        </p>
      </div>
    );
  }

  return (
    <Button
      onClick={handleLogin}
      disabled={connecting || !sdkReady}
      size="lg"
      className="w-full sm:w-auto"
    >
      {connecting ? (
        <span className="flex items-center space-x-2">
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Connecting…</span>
        </span>
      ) : (
        <span className="flex items-center space-x-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
          </svg>
          <span>Connect WhatsApp Business</span>
        </span>
      )}
    </Button>
  );
}
