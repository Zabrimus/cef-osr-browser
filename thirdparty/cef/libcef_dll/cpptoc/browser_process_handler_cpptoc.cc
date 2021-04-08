// Copyright (c) 2021 The Chromium Embedded Framework Authors. All rights
// reserved. Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE file.
//
// ---------------------------------------------------------------------------
//
// This file was generated by the CEF translator tool. If making changes by
// hand only do so within the body of existing method and function
// implementations. See the translator.README.txt file in the tools directory
// for more information.
//
// $hash=380946147815033eba2f98d612b723ef676ee711$
//

#include "libcef_dll/cpptoc/browser_process_handler_cpptoc.h"
#include "libcef_dll/cpptoc/client_cpptoc.h"
#include "libcef_dll/cpptoc/print_handler_cpptoc.h"
#include "libcef_dll/ctocpp/command_line_ctocpp.h"
#include "libcef_dll/transfer_util.h"

namespace {

// MEMBER FUNCTIONS - Body may be edited by hand.

void CEF_CALLBACK browser_process_handler_get_cookieable_schemes(
    struct _cef_browser_process_handler_t* self,
    cef_string_list_t schemes,
    int* include_defaults) {
  // AUTO-GENERATED CONTENT - DELETE THIS COMMENT BEFORE MODIFYING

  DCHECK(self);
  if (!self)
    return;
  // Verify param: schemes; type: string_vec_byref
  DCHECK(schemes);
  if (!schemes)
    return;
  // Verify param: include_defaults; type: bool_byref
  DCHECK(include_defaults);
  if (!include_defaults)
    return;

  // Translate param: schemes; type: string_vec_byref
  std::vector<CefString> schemesList;
  transfer_string_list_contents(schemes, schemesList);
  // Translate param: include_defaults; type: bool_byref
  bool include_defaultsBool =
      (include_defaults && *include_defaults) ? true : false;

  // Execute
  CefBrowserProcessHandlerCppToC::Get(self)->GetCookieableSchemes(
      schemesList, include_defaultsBool);

  // Restore param: schemes; type: string_vec_byref
  cef_string_list_clear(schemes);
  transfer_string_list_contents(schemesList, schemes);
  // Restore param: include_defaults; type: bool_byref
  if (include_defaults)
    *include_defaults = include_defaultsBool ? true : false;
}

void CEF_CALLBACK browser_process_handler_on_context_initialized(
    struct _cef_browser_process_handler_t* self) {
  // AUTO-GENERATED CONTENT - DELETE THIS COMMENT BEFORE MODIFYING

  DCHECK(self);
  if (!self)
    return;

  // Execute
  CefBrowserProcessHandlerCppToC::Get(self)->OnContextInitialized();
}

void CEF_CALLBACK browser_process_handler_on_before_child_process_launch(
    struct _cef_browser_process_handler_t* self,
    struct _cef_command_line_t* command_line) {
  // AUTO-GENERATED CONTENT - DELETE THIS COMMENT BEFORE MODIFYING

  DCHECK(self);
  if (!self)
    return;
  // Verify param: command_line; type: refptr_diff
  DCHECK(command_line);
  if (!command_line)
    return;

  // Execute
  CefBrowserProcessHandlerCppToC::Get(self)->OnBeforeChildProcessLaunch(
      CefCommandLineCToCpp::Wrap(command_line));
}

struct _cef_print_handler_t* CEF_CALLBACK
browser_process_handler_get_print_handler(
    struct _cef_browser_process_handler_t* self) {
  // AUTO-GENERATED CONTENT - DELETE THIS COMMENT BEFORE MODIFYING

  DCHECK(self);
  if (!self)
    return NULL;

  // Execute
  CefRefPtr<CefPrintHandler> _retval =
      CefBrowserProcessHandlerCppToC::Get(self)->GetPrintHandler();

  // Return type: refptr_same
  return CefPrintHandlerCppToC::Wrap(_retval);
}

void CEF_CALLBACK browser_process_handler_on_schedule_message_pump_work(
    struct _cef_browser_process_handler_t* self,
    int64 delay_ms) {
  // AUTO-GENERATED CONTENT - DELETE THIS COMMENT BEFORE MODIFYING

  DCHECK(self);
  if (!self)
    return;

  // Execute
  CefBrowserProcessHandlerCppToC::Get(self)->OnScheduleMessagePumpWork(
      delay_ms);
}

struct _cef_client_t* CEF_CALLBACK browser_process_handler_get_default_client(
    struct _cef_browser_process_handler_t* self) {
  // AUTO-GENERATED CONTENT - DELETE THIS COMMENT BEFORE MODIFYING

  DCHECK(self);
  if (!self)
    return NULL;

  // Execute
  CefRefPtr<CefClient> _retval =
      CefBrowserProcessHandlerCppToC::Get(self)->GetDefaultClient();

  // Return type: refptr_same
  return CefClientCppToC::Wrap(_retval);
}

}  // namespace

// CONSTRUCTOR - Do not edit by hand.

CefBrowserProcessHandlerCppToC::CefBrowserProcessHandlerCppToC() {
  GetStruct()->get_cookieable_schemes =
      browser_process_handler_get_cookieable_schemes;
  GetStruct()->on_context_initialized =
      browser_process_handler_on_context_initialized;
  GetStruct()->on_before_child_process_launch =
      browser_process_handler_on_before_child_process_launch;
  GetStruct()->get_print_handler = browser_process_handler_get_print_handler;
  GetStruct()->on_schedule_message_pump_work =
      browser_process_handler_on_schedule_message_pump_work;
  GetStruct()->get_default_client = browser_process_handler_get_default_client;
}

// DESTRUCTOR - Do not edit by hand.

CefBrowserProcessHandlerCppToC::~CefBrowserProcessHandlerCppToC() {}

template <>
CefRefPtr<CefBrowserProcessHandler> CefCppToCRefCounted<
    CefBrowserProcessHandlerCppToC,
    CefBrowserProcessHandler,
    cef_browser_process_handler_t>::UnwrapDerived(CefWrapperType type,
                                                  cef_browser_process_handler_t*
                                                      s) {
  NOTREACHED() << "Unexpected class type: " << type;
  return nullptr;
}

template <>
CefWrapperType
    CefCppToCRefCounted<CefBrowserProcessHandlerCppToC,
                        CefBrowserProcessHandler,
                        cef_browser_process_handler_t>::kWrapperType =
        WT_BROWSER_PROCESS_HANDLER;
