#ifndef VDR_OSR_BROWSER_JAVASCRIPTLOGGING_H
#define VDR_OSR_BROWSER_JAVASCRIPTLOGGING_H

#include "include/cef_display_handler.h"
#include "logger.h"
#include "browser.h"

class JavascriptLogging : public CefDisplayHandler {
    private:
        BrowserClient *browserClient;

    public:
        JavascriptLogging(BrowserClient *client) { this->browserClient = client; };
        ~JavascriptLogging() {};

        void OnAddressChange(CefRefPtr< CefBrowser > browser, CefRefPtr< CefFrame > frame, const CefString& url) override;
        bool OnConsoleMessage(CefRefPtr<CefBrowser> browser, cef_log_severity_t level, const CefString& message, const CefString& source, int line) override;
        void OnTitleChange(CefRefPtr< CefBrowser > browser, const CefString& title) override;
        bool OnTooltip(CefRefPtr< CefBrowser > browser, CefString& text) override;

    IMPLEMENT_REFCOUNTING(JavascriptLogging);
};

#endif // VDR_OSR_BROWSER_JAVASCRIPTLOGGING_H
