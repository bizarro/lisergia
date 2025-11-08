import { Html } from "@elysiajs/html"

interface ScriptsProps {
  analytics?: string
}

export const Scripts = ({ analytics }: ScriptsProps) => {
  const dev = import.meta.env.DEV

  return (
    <>
      <script type="module" src={dev ? '/src/app/index.ts' : '/bundle.js'}></script>


      {analytics && (
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${analytics}');
          `}
        </script>
      )}
    </>
  )
}
