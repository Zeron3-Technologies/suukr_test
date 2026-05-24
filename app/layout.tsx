import type { Metadata } from "next";
import { Inter, Fredoka } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { getPayloadClient } from "@/lib/cms";
import type { IntegrationSetting } from "@/payload-types";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Suükr | Luxury Dessert Café",
  description: "Frozen Yogurt, Shakes, Waffles, Cold Brew. Sweet Moments. Always.",
};

export const dynamic = "force-dynamic";

const getAnalyticsSettings = async () => {
  try {
    const payload = await getPayloadClient();
    return (await payload.findGlobal({
      slug: "integration-settings",
      depth: 0,
    })) as IntegrationSetting;
  } catch {
    return undefined;
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const integrations = await getAnalyticsSettings();
  const gaId = integrations?.analytics?.googleAnalyticsId;
  const metaPixelId = integrations?.analytics?.metaPixelId;

  return (
    <html
      lang="en"
      className={`${inter.variable} ${fredoka.variable} h-full antialiased`}
    >
      {gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}
      {metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
      <body className="min-h-screen bg-whiteOff text-deepRed">{children}</body>
    </html>
  );
}
