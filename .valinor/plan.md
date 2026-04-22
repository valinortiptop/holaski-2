# Project Plan

_Model: claude-opus-4-7 | Approved: 2026-04-22T23:46:58.642Z_

## Diagnóstico del problema Hotelbeds

Veo en el screenshot el banner amarillo "Mostrando hoteles de ejemplo — el inventario en vivo estará disponible pronto" y los precios en USD hardcodeados ($320, $180). Esto confirma que la llamada a Hotelbeds está fallando y el frontend está cayendo al fallback.

Antes de proponer el fix, necesito verificar exactamente **dónde** se rompe la cadena. Hay 4 puntos posibles de falla, y voy a revisarlos en orden.

### Cadena de llamadas actual

```
Frontend (/buscar)
  → supabase.functions.invoke('api-handler', { action: 'hotelbeds-search' })
    → api-handler edge function
      → supabase.functions.invoke('api-proxy', { provider: 'hotelbeds', ... })
        → Valinor api-proxy (resuelve signature auth desde integrations_registry)
          → api.test.hotelbeds.com / api.hotelbeds.com
```

### Hipótesis ordenadas por probabilidad

1. **Hotelbeds no está registrado en `integrations_registry`** de Valinor con el `project_id` correcto, o el registro tiene `auth_type` mal configurado (debería ser `signature` con `api_key` + `secret`).
2. **`api-handler` no está enviando el formato correcto** al `api-proxy` (p.ej. falta `method: 'POST'`, falta `body` con el payload de búsqueda, o el `path` está mal).
3. **El payload de búsqueda de Hotelbeds está mal armado** (fechas formato `YYYY-MM-DD`, `destination.code` como IANA, `occupancies` como array, etc.) y Hotelbeds responde 400.
4. **El try/catch en el frontend está atrapando cualquier error** y cayendo al mock sin loguear la causa real.

### Pasos de verificación que voy a ejecutar

Voy a lanzar verificaciones autónomas para confirmar el estado real antes de tocar código:

:::verify:verify-query
{
  "id": "check-integrations-registry",
  "query": "SELECT provider_slug, auth_type, base_url, is_active, created_at FROM public.integrations_registry WHERE provider_slug ILIKE '%hotelbeds%' OR provider_slug ILIKE '%hotel%'"
}
:::

:::verify:verify-query
{
  "id": "check-all-integrations",
  "query": "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE '%integration%'"
}
:::

:::verify:verify-query
{
  "id": "check-api-handler-logs-table",
  "query": "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name"
}
:::

### Preguntas críticas para ti

Mientras corren las verificaciones, necesito que confirmes dos cosas:

- **¿Registraste Hotelbeds en `/admin/integrations` de Valinor?** La memoria del proyecto dice "Configured Hotelbeds in the integrations_registry using the auth: signature method", pero necesito confirmar que el registro está **activo** y asociado a este `project_id` (HolaSki). Si lo registraste solo a nivel global pero no para este proyecto, el `api-proxy` lo rechazará.
- **¿Tenés credenciales de producción o de test?** Hotelbeds tiene dos entornos: `api.test.hotelbeds.com` (sandbox, datos limitados, pocos hoteles en Mendoza/Argentina) y `api.hotelbeds.com` (producción, requiere contrato activo). Si estás usando test, es normal que devuelva 0 resultados para Las Leñas porque el sandbox tiene inventario reducido a ciertas ciudades de Europa.

### Plan de acción (una vez confirmado)

Dependiendo de lo que arrojen las verificaciones:

- **Si `integrations_registry` está vacío o inactivo** → hay que registrarlo en Valinor admin panel. Yo no puedo insertar ahí desde este proyecto hijo.
- **Si está registrado pero el `api-handler` no lo invoca bien** → refactorizo `supabase/functions/api-handler/index.ts` para que use el patrón correcto `{ provider: 'hotelbeds', path: '/hotel-api/1.0/hotels', method: 'POST', body: {...} }`.
- **Si está todo bien pero Hotelbeds devuelve vacío** → agrego logging detallado y muestro el error real en el banner (en vez del mensaje genérico de "próximamente"), más un toggle para ver la respuesta cruda en modo debug.
- **Además, en todos los casos**: voy a cambiar el fallback para que, cuando falle Hotelbeds, muestre un error accionable ("Error: [mensaje real de la API]") en lugar del banner silencioso, así la próxima vez el problema es visible de inmediato.

Esperá los resultados de las verificaciones y respondeme las dos preguntas. Con eso te armo el fix exacto.