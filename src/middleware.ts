import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ar'],

  // Used when no locale matches
  defaultLocale: 'ar',
  
  // Set to true if you want to use the browser's language
  localeDetection: true
});

export const config = {
  // Match only internationalized pathnames, but exclude static files
  matcher: ['/', '/(ar|en)/:path*', '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)']
};
