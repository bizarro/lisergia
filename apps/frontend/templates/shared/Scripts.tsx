import { getVersionedPath } from '../helpers'

const isDev = process.env.NODE_ENV !== 'production'
const vitePort = process.env.VITE_PORT ?? process.env.BROWSERSYNC_PORT ?? '5173'
const viteOrigin = process.env.VITE_ORIGIN ?? `http://localhost:${vitePort}`

interface ScriptsProps {
  posthog?: {
    key: string
    host: string
  }
}

const posthogLoader = `!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);`
const posthogEarlyQueue = `!function(e){"capture captureException identify".split(" ").forEach(function(t){e[t]=function(){e.push([t].concat(Array.prototype.slice.call(arguments,0)))}})}(window.posthog);`

function getPostHogScript(posthog: NonNullable<ScriptsProps['posthog']>) {
  const key = JSON.stringify(posthog.key).replaceAll('<', '\\u003c')
  const config = JSON.stringify({
    api_host: posthog.host,
    defaults: '2026-05-30',
  }).replaceAll('<', '\\u003c')

  const initialize = `window.posthog.init(${key}, ${config})`

  return `${posthogLoader}\n${posthogEarlyQueue}\n!function(i){function r(){if("requestIdleCallback" in window){window.requestIdleCallback(i,{timeout:3000})}else{window.setTimeout(i,0)}}if(document.readyState==="complete"){r()}else{window.addEventListener("load",r,{once:true})}}(function(){${initialize}});`
}

export default function Scripts({ posthog }: ScriptsProps) {
  return (
    <>
      {isDev ? (
        <>
          <script type="module" src={`${viteOrigin}/@vite/client`}></script>
          <script type="module" src={`${viteOrigin}/app/index.ts`}></script>
        </>
      ) : (
        <script type="module" src={getVersionedPath('/bundle.js')}></script>
      )}

      {posthog && <script dangerouslySetInnerHTML={{ __html: getPostHogScript(posthog) }}></script>}
    </>
  )
}
