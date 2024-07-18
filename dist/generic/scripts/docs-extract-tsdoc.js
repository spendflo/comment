#!/usr/bin/env -S node --enable-source-maps
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// opensource/sdk-js/packages/types/dist/cjs/index.js
var require_cjs = __commonJS({
  "opensource/sdk-js/packages/types/dist/cjs/index.js"(exports) {
    "use strict";
    var resources = {
      en: {
        default: {},
        composer: {
          // The placeholder for sending a message that will create a new thread
          send_message_placeholder: "Add a comment...",
          // The placeholder for sending a message to a thread with messages in it
          reply_placeholder: "Reply...",
          // The placeholder for editing a message
          edit_message_placeholder: "Edit message...",
          // The tooltip for the "mention someone" menu button
          mention_someone_tooltip: "Mention someone",
          // The text of the button that starts an annotation
          annotate_action: "Annotate",
          // The tooltip for the annotation button if there is already an annotation
          // and clicking the button will cause it to be replaced
          replace_annotation_tooltip: "Replace annotation",
          // The tooltip for the button that adds an emoji to the message
          add_emoji_tooltip: "Add emoji",
          // The tooltip for the button that removes a task from the message
          remove_task_tooltip: "Remove task",
          // The tooltip for the button that adds a task to the message
          create_task_tooltip: "Create task",
          // The tooltip for the button that attaches a file to the message
          attach_file_tooltip: "Attach file",
          // The tooltip for the button that removes an attached file from the
          // message
          remove_file_action: "Remove",
          // The text of the button that initiates the Slack linking flow
          connect_to_slack_action: "Connect your Slack team",
          // The instructions shown in a message while the Slack linking flow is in
          // progress
          slack_follow_instructions: "Follow the instructions",
          // The text of the status indicator shown when a previous message is being
          // edited
          editing_status: "Editing",
          // The text of the button that cancels editing a previous message
          cancel_editing_action: "Cancel",
          // The text of the status indicator when the composer is disabled because
          // a thread is resolved
          resolved_status: "Resolved",
          // The text of the button in the composer that unresolves a thread
          unresolve_action: "Reopen to reply",
          // The text of the pill shown for an annotation when the annotation has no
          // more specific label
          annotation: "Your annotation",
          // The text of the button that removes an annotation from a message
          remove_annotation_action: "Remove",
          // The error text shown when a message failed to send
          send_message_action_failure: "Failed to send message. <restore>Restore the message</restore>",
          // The text shown when a user is dragging files over the composer
          drag_and_drop_files_tooltip: "Drop Files",
          attach_file_action_failure: "Failed to upload file: {{message}}"
        },
        thread: {
          // The title of the placeholder shown in an empty thread
          placeholder_title: "Chat with your team, right here",
          // The body of the placeholder shown in an empty thread
          placeholder_body: "Ask a question, give feedback, or just say 'Hi'. Comments can be seen by anyone who can access this page.",
          // The status text shown next to a thread where the first message is
          // unread
          new_status: "New",
          // The text of the link to add a reply to a thread
          reply_action: "Reply...",
          // The status text shown below a thread when it has unread replies
          new_replies_status_one: "1 unread",
          new_replies_status_other: "{{count}} unread",
          // The status text shown below a thread when it has no unread replies
          replies_status_one: "1 reply",
          replies_status_other: "{{count}} replies",
          // The text of the link that shows more messages in a thread when the list
          // of messages has been paginated
          show_more_one: "Show 1 more",
          show_more_other: "Show {{count}} more",
          // The text of the menu item that marks all messages in a thread as read
          mark_as_read_action: "Mark as read",
          // The text of the menu item that shares a thread with Slack
          share_via_slack_action: "Share with Slack",
          // The text of the menu item when an empty thread is set to
          share_via_slack_channel_action: "Share to #{{slackChannel}}",
          // The text of the menu item that shares a thread with Slack when the user
          // has not linked their Slack account
          share_via_slack_action_not_connected: "Connect to share",
          // The text shown after sharing a thread to Slack succeeds
          share_via_slack_action_success: "Shared to #{{slackChannel}}",
          // The placeholder for the input box for choosing a Slack channel to share
          // a thread to
          share_via_slack_channel_placeholder: "Type or select",
          // The text shown when sharing a thread to Slack and there are no public
          // channels in the Slack workspace the user has linked to
          share_via_slack_no_channels: "No public channels found",
          // The text shown when sharing a thread to Slack fails for an unknown reason
          share_via_slack_action_failure: "Error sharing to Slack, please try again",
          // The text of the menu item that shares a thread by email
          share_via_email_action: "Share via email",
          // The text of the button that shares a thread by email
          share_via_email_button_action: "$t(share_via_email_action)",
          // The text of the header for the email sharing dialog
          share_via_email_header: "$t(share_via_email_action)",
          // The text shown after sharing a thread to email succeeds
          share_via_email_action_success: "Shared to {{email}}",
          // The warning text shown to inform the user that when sharing a thread by
          // email, a screenshot will be sent with the email
          share_via_email_screenshot_warning: "A screenshot of this page will be included in the email.",
          // The placeholder for the input box for choosing an email address to
          // share a thread with
          share_via_email_placeholder: "email@email.com",
          // The text of the menu item that subscribes the user to a thread
          subscribe_action: "Subscribe",
          // The text shown after a user subscribes to a thread
          subscribe_action_success: "You've subscribed to this thread",
          // The text of the menu item that unsubscribes the user from a thread
          unsubscribe_action: "Unsubscribe",
          // The text shown after a user unsubscribes from a thread
          unsubscribe_action_success: "You've unsubscribed from this thread",
          // The text of the menu item that resolves a thread
          resolve_action: "Resolve",
          // The text shown after a user resolves a thread
          resolve_action_success: "You resolved this thread",
          // The status text shown on a resolved thread
          resolved_status: "Resolved",
          // The text of the menu item that unresolves a thread
          unresolve_action: "Reopen",
          // The text shown after a user unresolves a thread
          unresolve_action_success: "You have reopened this thread",
          // The text shown on the action to collapse an expanded thread
          collapse_action: "Collapse thread",
          // The text shown next to the facepile of users that are currently typing
          // into a thread
          typing_users_status: "Typing"
        },
        threads: {
          // The title placeholder text shown when no threads are shown in the
          // threads component
          placeholder_title: "Be the first to add a comment",
          // The body placeholder text shown when no threads are shown in a threaded
          // comments component
          placeholder_body: "Ask a question, give feedback, or just say 'Hi'. Comments can be seen by anyone who can access this page."
        },
        thread_list: {
          // The title placeholder text shown when no threads are shown in a thread
          // list
          placeholder_title: "Be the first to add a comment",
          // The body placeholder text shown when no threads are shown in a thread
          // list
          placeholder_body: "Ask a question, give feedback, or just say 'Hi'. Comments can be seen by anyone who can access this page.",
          // The text of the link that toggles the display of resolved threads from
          // not showing to showing
          show_resolved_threads_action: "Show resolved threads",
          // The text of the link that toggles the display of resolved threads from
          // showing to not showing
          hide_resolved_threads_action: "Hide resolved threads"
        },
        thread_preview: {
          // The text of the link that reveals the replies to a thread when there
          // are no unread messages in the thread
          show_replies_action_read_one: "1 reply",
          show_replies_action_read_other: "{{count}} replies",
          // The text of the link that reveals the replies to a thread when there
          // are unread messages in the thread
          show_replies_action_unread_one: "1 new reply",
          show_replies_action_unread_other: "{{count}} new replies",
          // The text of the link that hides the replies to a thread
          hide_replies_action: "Hide replies",
          // The text of the link that starts composing a reply to the thread
          reply_action: "Reply"
        },
        threaded_comments: {
          // The title placeholder text shown when no threads are shown in the unresolved threads portion of a
          // threaded comments component
          placeholder_title: "Be the first to add a comment",
          // The body placeholder text shown when no threads are shown in a threaded
          // comments component
          placeholder_body: "Ask a question, give feedback, or just say 'Hi'. Comments can be seen by anyone who can access this page.",
          // The title placeholder text shown when no threads are shown in the
          // resolved threads portion of a threaded comments component
          resolved_placeholder_title: "This is where resolved comments will appear",
          // The body placeholder text shown when no threads are shown in the
          // resolved threads portion of a threaded comments component
          resolved_placeholder_body: "Resolved comments can be seen by anyone who can access this page.",
          // The text of the button that shows unresolved threads
          show_unresolved: "Open",
          // The text of the button that shows resolved threads
          show_resolved: "Resolved",
          // The text of the link that toggles the display of resolved threads from
          // not showing to showing
          show_resolved_threads_action: "$t(thread_list:show_resolved_threads_action)",
          // The text of the link that toggles the display of resolved threads from
          // showing to not showing
          hide_resolved_threads_action: "$t(thread_list:hide_resolved_threads_action)",
          // The text of the link that shows additional threads when the list of
          // threads has been paginated
          load_more_action: "Load more",
          // The text of the link that reveals the replies to a thread when there
          // are no unread messages in the thread
          show_replies_action_read_one: "1 reply",
          show_replies_action_read_other: "{{count}} replies",
          // The text of the link that reveals the replies to a thread when there
          // are unread messages in the thread
          show_replies_action_unread_one: "1 new reply",
          show_replies_action_unread_other: "{{count}} new replies",
          // The text of the link that hides the replies to a thread
          hide_replies_action: "Hide replies",
          // The text of the link that shows more replies in a thread when the list
          // of messages has been paginated
          show_more_replies_action: "Show more",
          // The text of the link that starts composing a reply to the thread
          reply_action: "Reply",
          // The status text shown on a resolved thread
          resolved_status: "$t(thread:resolved_status)",
          // The text of the menu item that unresolves a thread
          unresolve_action: "$t(thread:unresolve_action)"
        },
        message: {
          // The text of the link to download an attached file
          download_action: "Download",
          // The error text shown when an attached file that is not an image cannot
          // be displayed
          unable_to_display_document: "Unable to display document",
          // The error text shown when an attached image file cannot be displayed
          unable_to_display_image: "Unable to display image",
          // The text shown next to a message that is currently being edited
          editing_status: "(Editing)",
          // The text shown next to a message that was previously edited
          edited_status: "(Edited)",
          // The text of the menu item that starts editing of a message
          edit_action: "Edit",
          // The text of the menu item that starts editing of a message in a
          // resolved thread
          edit_resolved_action: "Reopen to edit",
          // The text of the menu item that deletes a message
          delete_action: "Delete",
          // The status text that indicates a message was deleted
          deleted_message: "{{user.displayName}} deleted a message",
          // The status text that indicates one or more messages were deleted
          deleted_messages_one: "{{user.displayName}} deleted a message",
          deleted_messages_other: "{{user.displayName}} deleted {{count}} messages",
          // The tooltip on the indicator that a message arrived in Cord from Slack
          sent_via_slack_tooltip: "Sent via Slack",
          // The tooltip on the indicator that a message arrived in Cord from email
          sent_via_email_tooltip: "Sent via Email",
          // The text of the link that undeletes a message
          undo_delete_action: "Undo",
          // The text of the menu item that adds a reaction to a message
          add_reaction_action: "Add reaction",
          // The tooltip for the options menu on a message
          message_options_tooltip: "Options",
          // The status text shown when a screenshot is loading
          screenshot_loading_status: "Loading",
          // The status text shown when a screenshot is unavailable
          screenshot_missing_status: "No screenshot found",
          // The text shown on the button that displays a screenshot at a larger
          // size
          screenshot_expand_action: "Image",
          // The tooltip shown on the button that displays a screenshot at a larger
          // size
          screenshot_expand_tooltip: "Click to expand",
          // The status text showing who has seen a message when the list of users
          // is short enough to show every user individually
          seen_by_status: "Seen by {{users, list(style: short)}}",
          // The status text showing who has seen a message when the list of users
          // is too long to show every user individually
          seen_by_status_overflow_one: "Seen by {{users, list(style: narrow)}}, and 1 other",
          seen_by_status_overflow_other: "Seen by {{users, list(style: narrow)}}, and {{count}} others",
          // The text of the button in the media modal that copies a link to the
          // media
          image_modal_copy_link_action: "Link",
          // The tooltip for the button in the media modal that copies a link to the
          // media
          image_modal_copy_link_tooltip: "Click to copy",
          // The text shown after a user copies a link in the media modal
          image_modal_copy_link_success: "Copied to clipboard",
          // The status text shown below a blurred image in the media modal
          image_modal_blurred_status: "Potentially confidential content has been blurred",
          // The header text shown in the media modal for a screenshot accompanying
          // an annotation
          image_modal_annotation_header: "{{user.displayName}} annotated this <datespan>on {{date}}</datespan>",
          // The header text shown in the media modal for a normal file attachment
          image_modal_attachment_header: "{{user.displayName}} attached this <datespan>on {{date}}</datespan>",
          // The dayjs date format string used to display the date in the media
          // modal header
          image_modal_header_date_format: "D MMM [at] h:mm A",
          // The tooltip for a set of message reactions.
          reaction_with_emoji_name_tooltip_one: "{{users, list(style: narrow)}} reacted with {{emojiName}}",
          reaction_with_emoji_name_tooltip_other: "{{users, list(style: narrow)}} reacted with {{emojiName}}",
          // The tooltip for a set of message reactions where the viewer is one of
          // the users that reacted.
          reaction_with_emoji_name_including_viewer_tooltip_one: "{{users, list(style: narrow)}} reacted with {{emojiName}}",
          reaction_with_emoji_name_including_viewer_tooltip_other: "{{users, list(style: narrow)}} reacted with {{emojiName}}",
          // The strings used to display a relative timestamp on a message
          timestamp: {
            in_less_than_a_minute: "in less than a minute",
            just_now: "just now",
            in_minutes_one: "in 1 min",
            in_minutes_other: "in {{count}} mins",
            minutes_ago_one: "1 min ago",
            minutes_ago_other: "{{count}} mins ago",
            in_hours_one: "in 1 hour",
            in_hours_other: "in {{count}} hours",
            hours_ago_one: "1 hour ago",
            hours_ago_other: "{{count}} hours ago",
            yesterday_format: "[yesterday]",
            last_week_format: "dddd",
            tomorrow_format: "[tomorrow]",
            next_week_format: "dddd",
            this_year_format: "MMM D",
            other_format: "MMM D, YYYY"
          },
          // The strings used to display an absolute timestamp on a message
          absolute_timestamp: {
            today_format: "h:mm A",
            yesterday_format: "MMM D",
            last_week_format: "MMM D",
            tomorrow_format: "MMM D",
            next_week_format: "MMM D",
            this_year_format: "MMM D",
            other_format: "MMM D, YYYY",
            tooltip: "{{date, datetime(dateStyle: short; timeStyle: medium)}}"
          }
        },
        // The message_templates namespace is used for translating the body of Cord
        // messages by marking the messages with a translationKey.  See
        // https://docs.cord.com/customization/translations for more details on message
        // translation.
        message_templates: {
          cord: {
            // The message shown when a user resolves a thread
            thread_resolved: [
              {
                type: "p",
                children: [
                  {
                    type: "mention",
                    user: { id: "{{mention1.userID}}" },
                    children: [{ text: "{{mention1.text}}" }]
                  },
                  { text: " resolved this thread" }
                ]
              }
            ],
            // The message shown when a user unresolves a thread
            thread_unresolved: [
              {
                type: "p",
                children: [
                  {
                    type: "mention",
                    user: { id: "{{mention1.userID}}" },
                    children: [{ text: "{{mention1.text}}" }]
                  },
                  { text: " reopened this thread" }
                ]
              }
            ]
          }
        },
        sidebar: {
          // The text of the button that starts composing a message in a new thread
          add_comment_action: "Add comment",
          // The status text shown above the composer for a new thread
          add_comment_instruction: "Add your comment",
          // The tooltip for the button that closes the sidebar
          close_sidebar_tooltip: "Close",
          // The tooltip for the button that closes the settings in the sidebar
          close_settings_tooltip: "Close",
          // The tooltip for the button that shows the inbox
          inbox_tooltip: "All updates",
          // The text of the button that shows the thread options menu
          thread_options_menu: "Options",
          // The text shown above the list of threads
          thread_list_title: "Comments",
          // The text of the button that returns from a thread to the thread list
          return_to_list_action: "All",
          // The text shown above the composer that suggests annotating the page.
          // The <l> tag will cause the contents to be a link that starts
          // annotating.
          annotation_nudge: "Why not try <l>annotating part of the page</l>?"
        },
        notifications: {
          // The title of the notifications list
          notifications_title: "Notifications",
          // The text of the button that marks all notifications as read
          mark_all_as_read_action: "Mark all as read",
          // The text of the menu item that marks one notification as read
          mark_as_read_action: "Mark as read",
          // The text of the menu item that marks one notification as unread
          mark_as_unread_action: "Mark as unread",
          // The text of the menu item that deletes a notification
          delete_action: "Delete notification",
          // The title text shown when there are no notifications to display
          empty_state_title: "You\u2019re all caught up",
          // The body text shown when there are no notifications to display
          empty_state_body: "When someone @mentions you or replies to your comments, we\u2019ll let you know here.",
          // The tooltip for the button that shows the notification options
          notification_options_tooltip: "Options",
          // The strings used to display a relative timestamp on a message
          timestamp: {
            in_less_than_a_minute: "In less than a minute",
            just_now: "Just now",
            in_minutes_one: "In 1 min",
            in_minutes_other: "In {{count}} mins",
            minutes_ago_one: "1 min ago",
            minutes_ago_other: "{{count}} mins ago",
            in_hours_one: "In 1 hour",
            in_hours_other: "In {{count}} hours",
            hours_ago_one: "1 hour ago",
            hours_ago_other: "{{count}} hours ago",
            yesterday_format: "[Yesterday at] h:mma",
            last_week_format: "dddd",
            tomorrow_format: "[Tomorrow at] h:mma",
            next_week_format: "dddd",
            this_year_format: "MMM D, YYYY",
            other_format: "MMM D, YYYY"
          },
          absolute_timestamp: {
            today_format: "h:mm A",
            yesterday_format: "MMM D",
            last_week_format: "MMM D",
            tomorrow_format: "MMM D",
            next_week_format: "MMM D",
            this_year_format: "MMM D",
            other_format: "MMM D, YYYY",
            tooltip: "{{date, datetime(dateStyle: short; timeStyle: medium)}}"
          }
        },
        // The message_templates namespace is used for translating the body of Cord
        // notifications.
        notification_templates: {
          cord: {
            // A notification that a single user reacted to a message
            reaction_single: "<user>{{senders.0.displayName}}</user> reacted {{reaction}} to your message",
            // A notification that two users reacted to a message
            reaction_double: "<user>{{senders.0.displayName}}</user> <bold>and</bold> <user>{{senders.1.displayName}}</user> reacted {{reaction}} to your message",
            // A notification that three or more users reacted to a message
            reaction_overflow_one: "<user>{{senders.0.displayName}}</user> <bold>and 1 other</bold> reacted {{reaction}} to your message",
            reaction_overflow_other: "<user>{{senders.0.displayName}}</user> <bold>and {{count}} others</bold> reacted {{reaction}} to your message",
            // A notification that a user replied to a message
            reply: "<user>{{senders.0.displayName}}</user> replied on <bold>{{threadName}}</bold>",
            // A notification that a user mentioned the viewer in a message
            reply_mention: "<user>{{senders.0.displayName}}</user> mentioned you in <bold>{{threadName}}</bold>",
            // A notification that a user mentioned and assigned the viewer in a
            // message
            reply_mention_assign: "<user>{{senders.0.displayName}}</user> mentioned you and assigned you to a task in <bold>{{threadName}}</bold>",
            // A notification that a user mentioned and unassigned the viewer in a
            // message
            reply_mention_unassign: "<user>{{senders.0.displayName}}</user> mentioned you and unassigned you from a task in <bold>{{threadName}}</bold>",
            // A notification that a user mentioned the viewer in a message and
            // attached a file to that message
            reply_mention_attachment: "<user>{{senders.0.displayName}}</user> mentioned you and sent you a file in <bold>{{threadName}}</bold>",
            // A notification that a user assigned a task to the viewer in a message
            reply_assign: "<user>{{senders.0.displayName}}</user> assigned you to a task in <bold>{{threadName}}</bold>",
            // A notification that a user unassigned a task from the viewer in a
            // message
            reply_unassign: "<user>{{senders.0.displayName}}</user> unassigned you from a task in <bold>{{threadName}}</bold>",
            // A notification that a user created a new thread
            thread_create: "<user>{{senders.0.displayName}}</user> created a new thread named <bold>{{threadName}}</bold>",
            // A notification that a user resolved a thread
            thread_resolve: "<user>{{senders.0.displayName}}</user> resolved the thread <bold>{{threadName}}</bold>",
            // A notification that a user unresolved a thread
            thread_unresolve: "<user>{{senders.0.displayName}}</user> reopened the thread <bold>{{threadName}}</bold>"
          }
        },
        presence: {
          // The string shown when a user is currently active
          viewing: "Viewing",
          // The strings used to display a relative timestamp in a presence display
          timestamp: {
            in_less_than_a_minute: "Viewing in less than a minute",
            just_now: "Viewed just now",
            in_minutes_one: "Viewing in 1 min",
            in_minutes_other: "Viewing in {{count}} mins",
            minutes_ago_one: "Viewed 1 min ago",
            minutes_ago_other: "Viewed {{count}} mins ago",
            in_hours_one: "Viewing in 1 hour",
            in_hours_other: "Viewing in {{count}} hours",
            hours_ago_one: "Viewed 1 hour ago",
            hours_ago_other: "Viewed {{count}} hours ago",
            yesterday_format: "[Viewed yesterday at] h:mma",
            last_week_format: "[Viewed] dddd",
            tomorrow_format: "[Viewing tomorrow at] h:mma",
            next_week_format: "[Viewing] dddd",
            this_year_format: "[Viewed] MMM D, YYYY",
            other_format: "[Viewed] MMM D, YYYY"
          }
        },
        inbox: {
          // The text of the link that navigates to the page a thread is on
          go_to_page_action: "Go to page",
          // The tooltip of the button that closes the inbox
          close_tooltip: "Close",
          // The title of the list of threads in the inbox
          inbox_title: "Your Inbox",
          // The title of the list of threads across all locations
          all_pages_title: "All Pages",
          // The tooltip of the button that displays the settings
          settings_tooltip: "Collaboration settings",
          // The text of the button that marks all threads in the inbox as read
          mark_all_as_read_action: "Mark all as read",
          // The title text shown when there are no threads in the inbox
          empty_state_title: "You\u2019re all caught up",
          // The body text shown when there are no threads in the inbox
          empty_state_body: "When someone @mentions you or replies to your comments, we\u2019ll let you know here."
        },
        annotation: {
          // The instructional text shown when annotating
          click_prompt: "Click to comment",
          // The tooltip shown next to the cursor when annotating an area that does
          // not have selectable text
          click_tooltip: "Click to comment",
          // The tooltip shown next to the cursor when annotating an area that has
          // selectable text
          click_or_select_tooltip: "Click or select text to comment",
          // The text shown on the link to cancel annotating
          cancel_annotating: "Cancel",
          // The text of the pill shown for an annotation when the annotation has no
          // more specific label
          annotation: "Annotation",
          // The text shown on the button that unhides the annotation from the page
          keep_pin_on_page_action: "Keep pin on page",
          // The status text shown when the element the annotation was associated
          // with cannot be found on the page
          changed: "The annotated area has changed",
          // The text for the link next to an annotation pin that hides the
          // annotation from the page
          hide_action: "Hide for you",
          // The text for the link that shows the message associated with an
          // annotation
          show_message_action: "Click to view message"
        },
        user: {
          // The text shown for the viewer
          viewer_user: "{{user.displayName}} (you)",
          // The text shown for the viewer when further name context is needed
          viewer_user_subtitle: "{{user.secondaryDisplayName}}",
          // The text shown for a non-viewer user
          other_user: "{{user.displayName}}",
          // The text shown for a non-viewer user when further name context is
          // needed
          other_user_subtitle: "{{user.secondaryDisplayName}}",
          // Text needed for showing simple first person indication
          // (i.e. for reactions where you have reacted)
          viewer_user_short: "You"
        },
        // Cord's emoji picker is an external library, which doesn't use i18next,
        // nor conforms to Cord's patterns. You can still translate these strings
        // like you would translate any other string in this file.
        // For more context, see https://www.npmjs.com/package/emoji-picker-element#internationalization
        emoji_picker: {
          categories: {
            custom: "Custom",
            "smileys-emotion": "Smileys and emoticons",
            "people-body": "People and body",
            "animals-nature": "Animals and nature",
            "food-drink": "Food and drink",
            "travel-places": "Travel and places",
            activities: "Activities",
            objects: "Objects",
            symbols: "Symbols",
            flags: "Flags"
          },
          categoriesLabel: "Categories",
          emojiUnsupportedMessage: "Your browser does not support color emoji.",
          favoritesLabel: "Favorites",
          loadingMessage: "Loading\u2026",
          networkErrorMessage: "Could not load emoji.",
          regionLabel: "Emoji picker",
          searchDescription: "When search results are available, press up or down to select and enter to choose.",
          searchLabel: "Search",
          searchResultsLabel: "Search results",
          skinToneDescription: "When expanded, press up or down to select and enter to choose.",
          skinToneLabel: "Choose a skin tone (currently {skinTone})",
          skinTones: [
            "Default",
            "Light",
            "Medium-Light",
            "Medium",
            "Medium-Dark",
            "Dark"
          ],
          skinTonesLabel: "Skin tones"
        }
      },
      // Cord's emoji picker is an external library, which doesn't use i18next, thus it
      // doesn't support "ci mode" out of the box. So we add our own:
      cimode: {
        emoji_picker: {
          categories: {
            custom: "custom",
            "smileys-emotion": "smileys-emotion",
            "people-body": "people-body",
            "animals-nature": "animals-nature",
            "food-drink": "food-drink",
            "travel-places": "travel-places",
            activities: "activities",
            objects: "objects",
            symbols: "symbols",
            flags: "flags"
          },
          categoriesLabel: "categoriesLabel",
          emojiUnsupportedMessage: "emojiUnsupportedMessage",
          favoritesLabel: "favoritesLabel",
          loadingMessage: "loadingMessage",
          networkErrorMessage: "networkErrorMessage",
          regionLabel: "regionLabel",
          searchDescription: "searchDescription",
          searchLabel: "searchLabel",
          searchResultsLabel: "searchResultsLabel",
          skinToneDescription: "skinToneDescription",
          skinToneLabel: "skinToneLabel",
          skinTones: [
            "Default",
            "Light",
            "Medium-Light",
            "Medium",
            "Medium-Dark",
            "Dark"
          ],
          skinTonesLabel: "skinTonesLabel"
        }
      }
    };
    function isEqualLocation(a, b) {
      if (a === b) {
        return true;
      }
      if (!a || !b) {
        return false;
      }
      const aKeys = Object.keys(a);
      if (aKeys.length !== Object.keys(b).length) {
        return false;
      }
      if (!aKeys.every((aKey) => Object.prototype.hasOwnProperty.call(b, aKey))) {
        return false;
      }
      return aKeys.every((key) => a[key] === b[key]);
    }
    exports.MessageNodeType = void 0;
    (function(MessageNodeType3) {
      MessageNodeType3["ASSIGNEE"] = "assignee";
      MessageNodeType3["BULLET"] = "bullet";
      MessageNodeType3["CODE"] = "code";
      MessageNodeType3["LINK"] = "link";
      MessageNodeType3["MENTION"] = "mention";
      MessageNodeType3["NUMBER_BULLET"] = "number_bullet";
      MessageNodeType3["PARAGRAPH"] = "p";
      MessageNodeType3["QUOTE"] = "quote";
      MessageNodeType3["TODO"] = "todo";
      MessageNodeType3["MARKDOWN"] = "markdown";
    })(exports.MessageNodeType || (exports.MessageNodeType = {}));
    var MARKS = ["bold", "italic", "underline", "code"];
    var STYLED_BLOCK_TYPES = [
      exports.MessageNodeType.BULLET,
      exports.MessageNodeType.NUMBER_BULLET,
      exports.MessageNodeType.TODO,
      exports.MessageNodeType.QUOTE
    ];
    function isStyledBlockType(t) {
      return STYLED_BLOCK_TYPES.includes(t);
    }
    var COMPOSER_SIZE = ["small", "medium", "large"];
    var VIRTUALISED_LISTS = [
      "monacoEditor",
      "reactTree",
      "konvaCanvas"
    ];
    var BLUR_DISPLAY_LOCATIONS = ["everywhere", "outside_page"];
    var CAPTURE_SCREENSHOT_EVENT = [
      "new-annotation",
      "share-via-email",
      "new-thread",
      "new-message"
    ];
    function isCaptureScreenshotEvent(captureEvent) {
      return CAPTURE_SCREENSHOT_EVENT.indexOf(captureEvent) !== -1;
    }
    function isBlurDisplayLocation(behavior) {
      return BLUR_DISPLAY_LOCATIONS.indexOf(behavior) !== -1;
    }
    var ANNOTATION_MODES = [
      "everywhere",
      "custom_targets_only",
      "none"
    ];
    function isAnnotationMode(mode) {
      return ANNOTATION_MODES.indexOf(mode) !== -1;
    }
    var CORD_ANNOTATION_LOCATION_DATA_ATTRIBUTE = "data-cord-annotation-location";
    var CORD_ANNOTATION_ALLOWED_DATA_ATTRIBUTE = "data-cord-annotation-allowed";
    var CORD_COMPONENT_WRAPS_DOM_DATA_ATTRIBUTE = "data-cord-component-wraps-dom";
    var CORD_SCREENSHOT_TARGET_DATA_ATTRIBUTE = "data-cord-screenshot-target";
    function locationJson3(c) {
      return JSON.stringify(Object.fromEntries(Object.entries(c).filter(([_key, value]) => value !== void 0).sort(([keyA], [keyB]) => keyA < keyB ? -1 : 1)));
    }
    exports.ANNOTATION_MODES = ANNOTATION_MODES;
    exports.BLUR_DISPLAY_LOCATIONS = BLUR_DISPLAY_LOCATIONS;
    exports.CAPTURE_SCREENSHOT_EVENT = CAPTURE_SCREENSHOT_EVENT;
    exports.COMPOSER_SIZE = COMPOSER_SIZE;
    exports.CORD_ANNOTATION_ALLOWED_DATA_ATTRIBUTE = CORD_ANNOTATION_ALLOWED_DATA_ATTRIBUTE;
    exports.CORD_ANNOTATION_LOCATION_DATA_ATTRIBUTE = CORD_ANNOTATION_LOCATION_DATA_ATTRIBUTE;
    exports.CORD_COMPONENT_WRAPS_DOM_DATA_ATTRIBUTE = CORD_COMPONENT_WRAPS_DOM_DATA_ATTRIBUTE;
    exports.CORD_SCREENSHOT_TARGET_DATA_ATTRIBUTE = CORD_SCREENSHOT_TARGET_DATA_ATTRIBUTE;
    exports.MARKS = MARKS;
    exports.VIRTUALISED_LISTS = VIRTUALISED_LISTS;
    exports.isAnnotationMode = isAnnotationMode;
    exports.isBlurDisplayLocation = isBlurDisplayLocation;
    exports.isCaptureScreenshotEvent = isCaptureScreenshotEvent;
    exports.isEqualLocation = isEqualLocation;
    exports.isStyledBlockType = isStyledBlockType;
    exports.locationJson = locationJson3;
    exports.translationResources = resources;
  }
});

// scripts/docs-extract-tsdoc.ts
import "dotenv/config.js";
import * as path from "path";
import * as prettier from "prettier";
import ts from "typescript";
import {
  DocNodeKind,
  StandardTags,
  TSDocConfiguration,
  TSDocParser,
  TSDocTagDefinition,
  TSDocTagSyntaxKind
} from "@microsoft/tsdoc";

// common/util/index.ts
import md5 from "blueimp-md5";
import jsonStableStringify2 from "fast-json-stable-stringify";
import { unique } from "radash";
import shajs from "sha.js";
import dayjs from "dayjs";
import Calendar from "dayjs/plugin/calendar.js";
import isBetween from "dayjs/plugin/isBetween.js";

// common/types/index.ts
import jsonStableStringify from "fast-json-stable-stringify";
var import_types = __toESM(require_cjs(), 1);
var import_types2 = __toESM(require_cjs(), 1);

// common/const/Urls.ts
var TOP_SERVER_HOST = process.env.TOP_SERVER_HOST;
var APP_SERVER_HOST = process.env.APP_SERVER_HOST;
var API_SERVER_HOST = process.env.API_SERVER_HOST;
var API_SERVER_HOST_PRODUCTION = process.env.API_SERVER_HOST_PRODUCTION;
var ADMIN_SERVER_HOST = process.env.ADMIN_SERVER_HOST;
var CONSOLE_SERVER_HOST = process.env.CONSOLE_SERVER_HOST;
var MARKETING_SERVER_HOST = process.env.MARKETING_SERVER_HOST;
var CORD_TO_HOST = process.env.CORD_TO_HOST;
var AUTH0_CUSTOM_LOGIN_DOMAIN = process.env.AUTH0_CUSTOM_LOGIN_DOMAIN;
var DOCS_SERVER_HOST = process.env.DOCS_SERVER_HOST;
var SLACK_APP_REDIRECT_HOST = process.env.SLACK_APP_REDIRECT_HOST;
var TOP_ORIGIN = "https://" + process.env.TOP_SERVER_HOST;
var APP_ORIGIN = "https://" + process.env.APP_SERVER_HOST;
var API_ORIGIN = "https://" + process.env.API_SERVER_HOST;
var ADMIN_ORIGIN = "https://" + process.env.ADMIN_SERVER_HOST;
var CONSOLE_ORIGIN = "https://" + process.env.CONSOLE_SERVER_HOST;
var MARKETING_ORIGIN = "https://" + process.env.MARKETING_SERVER_HOST;
var CORD_TO_ORIGIN = "https://" + process.env.CORD_TO_HOST;
var AUTH0_ORIGIN = "https://" + process.env.AUTH0_CUSTOM_LOGIN_DOMAIN;
var DOCS_ORIGIN = "https://" + process.env.DOCS_SERVER_HOST;
var DOCS_AI_CHATBOT_SERVER_HOST = process.env.DOCS_AI_CHATBOT_SERVER_HOST;
var COMMUNITY_ORIGIN = "https://" + process.env.COMMUNITY_SERVER_HOST;

// common/const/Ids.ts
var AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
var DOCS_URLS = {
  tutorials: {
    getProductionReady: {
      addYourBranding: `${DOCS_ORIGIN}/get-started/live-css-editor`
    },
    integrationGuide: `${DOCS_ORIGIN}/get-started/integration-guide`,
    demoApps: `${DOCS_ORIGIN}/get-started/demo-apps`
  },
  components: {
    thread: `${DOCS_ORIGIN}/components/cord-thread`,
    threadList: `${DOCS_ORIGIN}/components/cord-thread-list`,
    threadedComments: `${DOCS_ORIGIN}/components/cord-threaded-comments`,
    sidebar: `${DOCS_ORIGIN}/components/cord-sidebar`,
    inbox: `${DOCS_ORIGIN}/components/cord-inbox`,
    inboxLauncher: `${DOCS_ORIGIN}/components/cord-inbox-launcher`,
    sidebarLauncher: `${DOCS_ORIGIN}/components/cord-sidebar-launcher`,
    composer: `${DOCS_ORIGIN}/components/cord-composer`,
    message: `${DOCS_ORIGIN}/components/cord-message`,
    messageContent: `${DOCS_ORIGIN}/components/cord-message-content`,
    reactions: `${DOCS_ORIGIN}/components/cord-reactions`
  },
  howTo: {
    customThreadedComments: `${DOCS_ORIGIN}/customization/custom-threaded-comments`,
    cssCustomization: `${DOCS_ORIGIN}/customization/css`,
    replacements: `${DOCS_ORIGIN}/customization/custom-react-components/tutorial`
  },
  getStarted: {
    authenticateYourUser: `${DOCS_ORIGIN}/get-started/integration-guide/generate-an-auth-token`
  },
  betaV2Components: {
    threads: `${DOCS_ORIGIN}/components/cord-threads?version=2.0`,
    thread: `${DOCS_ORIGIN}/components/cord-thread?version=2.0`
  }
};

// opensource/sdk-js/packages/react/common/lib/messageNode.ts
var import_types3 = __toESM(require_cjs(), 1);
import { Element } from "slate";
import { v4 as uuid } from "uuid";

// common/util/index.ts
function isDefined(value) {
  return value !== null && value !== void 0;
}
dayjs.extend(Calendar);
dayjs.extend(isBetween);

// scripts/docs-extract-tsdoc.ts
var TSDOC_CONFIG = new TSDocConfiguration();
TSDOC_CONFIG.addTagDefinitions([
  new TSDocTagDefinition({
    tagName: "@minLength",
    syntaxKind: TSDocTagSyntaxKind.BlockTag
  }),
  new TSDocTagDefinition({
    tagName: "@maxLength",
    syntaxKind: TSDocTagSyntaxKind.BlockTag
  }),
  new TSDocTagDefinition({
    tagName: "@format",
    syntaxKind: TSDocTagSyntaxKind.BlockTag
  }),
  new TSDocTagDefinition({
    tagName: "@minimum",
    syntaxKind: TSDocTagSyntaxKind.BlockTag
  }),
  new TSDocTagDefinition({
    tagName: "@maximum",
    syntaxKind: TSDocTagSyntaxKind.BlockTag
  }),
  new TSDocTagDefinition({
    tagName: "@minItems",
    syntaxKind: TSDocTagSyntaxKind.BlockTag
  }),
  new TSDocTagDefinition({
    tagName: "@maxItems",
    syntaxKind: TSDocTagSyntaxKind.BlockTag
  }),
  new TSDocTagDefinition({
    tagName: "@additionalProperties",
    syntaxKind: TSDocTagSyntaxKind.BlockTag
  })
]);
function containerToMarkdown(container, customBlocks) {
  let content = nodesToMarkdown(container.nodes);
  if (customBlocks) {
    for (const block of customBlocks) {
      if (block.blockTag.tagNameWithUpperCase === "@MAXITEMS") {
        content += `

This field has a maximum length of ${containerToMarkdown(
          block.content
        )}.`;
      }
    }
  }
  return content;
}
function nodesToMarkdown(nodes) {
  return nodesToMarkdownInternal(nodes).trim();
}
function nodesToMarkdownInternal(nodes) {
  let result = "";
  for (const node of nodes) {
    switch (node.kind) {
      case DocNodeKind.PlainText:
        result += node.text.replaceAll(
          "(https://docs.cord.com/",
          "(/"
        );
        break;
      case DocNodeKind.EscapedText:
        result += node.decodedText;
        break;
      case DocNodeKind.CodeSpan:
        result += "`" + node.code + "`";
        break;
      case DocNodeKind.FencedCode: {
        const fencedCode = node;
        result += "```" + fencedCode.language + "\n" + fencedCode.code + "\n```";
        break;
      }
      case DocNodeKind.Section:
        result += nodesToMarkdownInternal(node.nodes);
        break;
      case DocNodeKind.SoftBreak:
        result += " ";
        break;
      case DocNodeKind.Paragraph:
        result += nodesToMarkdownInternal(node.nodes) + "\n\n";
        break;
      case DocNodeKind.ErrorText: {
        const errorTextNode = node;
        throw new Error(
          `The docs have a TSDoc formatting error: ${errorTextNode.errorMessage}

${errorTextNode.textExcerpt}`
        );
      }
      case DocNodeKind.BlockTag:
        break;
      default:
        throw new Error(`Unknown doc node kind: ${node.kind}`);
    }
  }
  return result;
}
function extractExamples(customBlocks) {
  const exampleBlocks = customBlocks.filter(
    (b) => b.blockTag.tagNameWithUpperCase === StandardTags.example.tagNameWithUpperCase
  );
  const result = {};
  for (const exampleBlock of exampleBlocks) {
    let nodes = exampleBlock.content.nodes;
    let key = "Example";
    if (nodes[0].kind === DocNodeKind.Paragraph) {
      key = containerToMarkdown(nodes[0]);
      nodes = nodes.slice(1);
    }
    if (nodes[0].kind === DocNodeKind.FencedCode) {
      result[key] = nodes[0].code.trim();
    } else {
      result[key] = nodesToMarkdown(nodes);
    }
  }
  return result;
}
function getTsDoc(node) {
  const sourceText = node.getSourceFile().getFullText();
  const commentRanges = ts.getLeadingCommentRanges(sourceText, node.pos)?.filter(({ pos }) => sourceText.substring(pos, pos + 3) === "/**");
  if (!commentRanges || commentRanges.length === 0) {
    return void 0;
  }
  if (commentRanges.length !== 1) {
    throw new Error("Node had more than one doc comment");
  }
  const commentRange = commentRanges[0];
  const parser = new TSDocParser(TSDOC_CONFIG);
  return parser.parseString(
    sourceText.substring(commentRange.pos, commentRange.end)
  ).docComment;
}
function isHidden(docs) {
  if (docs?.deprecatedBlock) {
    return true;
  }
  if (docs?.privateRemarks) {
    return !!containerToMarkdown(docs.privateRemarks?.content).includes(
      "hidden"
    );
  }
  return false;
}
function isBuiltInType(type) {
  return !!type.symbol?.declarations?.some(
    (d) => d.getSourceFile().hasNoDefaultLib
  );
}
function isForeignType(type) {
  return !!type.symbol?.declarations?.some(
    (d) => d.getSourceFile().fileName.includes("/node_modules/")
  );
}
function isFromBuiltInType(symbol) {
  return !!symbol.declarations?.some(
    (d) => d.parent.getSourceFile().hasNoDefaultLib
  );
}
var UTILITY_TYPES = ["Partial", "Required", "Readonly", "Pick", "Omit"];
function isUtilityType(type) {
  return !!(isBuiltInType(type) && type.aliasSymbol && UTILITY_TYPES.includes(type.aliasSymbol.name));
}
function isUnion(type) {
  return !!(type.flags & ts.TypeFlags.Union);
}
function isStringLiteral(type) {
  return !!(type.flags & ts.TypeFlags.StringLiteral);
}
function isBooleanLiteral(type) {
  return !!(type.flags & ts.TypeFlags.BooleanLiteral);
}
function isPrimitiveType(type) {
  return !!(type.flags & (ts.TypeFlags.String | ts.TypeFlags.Number | ts.TypeFlags.Boolean | ts.TypeFlags.Null | ts.TypeFlags.Undefined));
}
function isObject(type) {
  return !!(type.flags & ts.TypeFlags.Object);
}
function isIntersection(type) {
  return !!(type.flags & ts.TypeFlags.Intersection);
}
function isFunction(type) {
  return type.getCallSignatures().length > 0;
}
function isArray(type) {
  return isObject(type) && type.getSymbol()?.getName() === "Array" && !!(type.objectFlags & ts.ObjectFlags.Reference);
}
function isTuple(type) {
  return isObject(type) && !!(type.objectFlags & ts.ObjectFlags.Reference) && !!(type.target.objectFlags & ts.ObjectFlags.Tuple);
}
function isUndefined(type) {
  return !!(type.flags & ts.TypeFlags.Undefined);
}
function isOptional(symbol) {
  return !!(symbol.flags & ts.SymbolFlags.Optional);
}
function isMethod(symbol) {
  return !!(symbol.flags & ts.SymbolFlags.Method);
}
function isProperty(symbol) {
  return !!(symbol.flags & ts.SymbolFlags.Property);
}
function typeForSymbol(symbol, typeChecker) {
  if (symbol.declarations?.[0]) {
    return [
      typeChecker.getTypeOfSymbolAtLocation(symbol, symbol.declarations[0]),
      getTsDoc(symbol.declarations[0])
    ];
  } else {
    return [typeChecker.getTypeOfSymbol(symbol), void 0];
  }
}
function typeDetails(type, typeChecker, options = {}) {
  return typeDetailsInternal(type, typeChecker, /* @__PURE__ */ new Set(), options);
}
function typeDetailsInternal(type, typeChecker, seenTypes, options = {}) {
  if (seenTypes.has(type)) {
    return {
      type: typeChecker.typeToString(type)
    };
  }
  const originalType = type;
  try {
    seenTypes.add(originalType);
    if (options.removeUndefined) {
      if (isUnion(type)) {
        const undefinedIndex = type.types.findIndex(isUndefined);
        if (undefinedIndex > -1) {
          if (type.types.length === 2) {
            type = type.types[1 - undefinedIndex];
          } else {
            type = {
              ...type,
              types: type.types.filter((t) => !isUndefined(t))
            };
          }
        }
      }
    }
    if (isUnion(type) && type.types.filter(isBooleanLiteral).length === 2) {
      if (type.types.length === 2) {
        return {
          type: "boolean"
        };
      }
      type = {
        ...type,
        types: [
          {
            flags: ts.TypeFlags.Boolean
          },
          ...type.types.filter((t) => !isBooleanLiteral(t))
        ]
      };
    }
    if (isUnion(type)) {
      if (type.types.every(isStringLiteral)) {
        return {
          type: "string",
          enum: type.types.map((t) => t.value)
        };
      }
      if (type.types.every(isPrimitiveType)) {
        return {
          type: type.types.map((t) => typeChecker.typeToString(t))
        };
      }
      return {
        anyOf: type.types.map(
          (t) => typeDetailsInternal(
            t,
            typeChecker,
            seenTypes
          )
        )
      };
    }
    if (isArray(type)) {
      return {
        type: typeChecker.typeToString(type),
        items: typeDetailsInternal(
          typeChecker.getTypeArguments(type)[0],
          typeChecker,
          seenTypes
        )
      };
    }
    if (isTuple(type)) {
      return {
        type: typeChecker.typeToString(type)
      };
    }
    if ((isObject(type) || isIntersection(type)) && !isFunction(type) && (!(isBuiltInType(type) || isForeignType(type)) || isUtilityType(type)) && typeChecker.getPropertiesOfType(type).length > 0) {
      const result = {
        properties: {},
        propertyOrder: [],
        required: []
      };
      for (const prop of typeChecker.getPropertiesOfType(type)) {
        const [propType, docs] = typeForSymbol(prop, typeChecker);
        if (isHidden(docs)) {
          continue;
        }
        result.properties[prop.getName()] = {
          description: docs ? containerToMarkdown(docs.summarySection, docs.customBlocks) : void 0,
          ...typeDetailsInternal(propType, typeChecker, seenTypes, {
            removeUndefined: true
          })
        };
        result.propertyOrder.push(prop.getName());
        if (!isOptional(prop)) {
          result.required.push(prop.getName());
        }
      }
      const typeToString = typeChecker.typeToString(type);
      return {
        // If typeToString starts with a brace, it doesn't have a name and it's
        // just outputting the structure, so call it 'object'
        type: typeToString.startsWith("{") ? "object" : typeToString,
        ...result
      };
    }
    return {
      type: typeChecker.typeToString(type)
    };
  } finally {
    seenTypes.delete(originalType);
  }
}
function extractParameters(declaration, typeChecker) {
  const result = {
    propertyOrder: [],
    required: [],
    properties: {}
  };
  const paramDocs = getTsDoc(declaration)?.params;
  for (const parameter of declaration.parameters) {
    const name = parameter.name.getText();
    const optional = typeChecker.isOptionalParameter(parameter);
    const docBlock = paramDocs?.tryGetBlockByName(name);
    result.properties[name] = {
      description: docBlock ? containerToMarkdown(docBlock.content) : void 0,
      ...typeDetails(typeChecker.getTypeAtLocation(parameter), typeChecker, {
        removeUndefined: optional
      })
    };
    result.propertyOrder.push(name);
    if (!optional) {
      result.required?.push(name);
    }
  }
  return result;
}
function extractSingleFunctionDeclaration(node, declaration, typeChecker) {
  const docs = getTsDoc(declaration);
  if (!docs) {
    return void 0;
  }
  const signature = typeChecker.getSignatureFromDeclaration(declaration);
  return {
    name: node.getName(),
    summary: containerToMarkdown(docs.summarySection),
    examples: extractExamples(docs.customBlocks),
    parameters: extractParameters(declaration, typeChecker),
    returns: {
      description: docs.returnsBlock ? containerToMarkdown(docs.returnsBlock.content) : void 0,
      ...typeDetails(signature.getReturnType(), typeChecker)
    }
  };
}
function extractFunction(symbol, typeChecker) {
  const declarations = (symbol.getDeclarations() ?? []).filter(
    (d) => ts.isFunctionDeclaration(d) || ts.isMethodSignature(d)
  );
  if (declarations.length === 0) {
    return void 0;
  }
  if (declarations.length === 1) {
    return extractSingleFunctionDeclaration(
      symbol,
      declarations[0],
      typeChecker
    );
  } else {
    return {
      overloaded: true,
      overloads: declarations.filter((d) => ts.isMethodSignature(d) || !d.body).map(
        (declaration) => extractSingleFunctionDeclaration(symbol, declaration, typeChecker)
      ).filter(isDefined)
    };
  }
}
function extractModule(moduleSymbol, typeChecker) {
  const result = {};
  typeChecker.getExportsOfModule(moduleSymbol).forEach((exported) => {
    switch (exported.flags) {
      case ts.SymbolFlags.Alias: {
        const aliased = typeChecker.getAliasedSymbol(exported);
        switch (aliased.flags) {
          case ts.SymbolFlags.ValueModule:
            result[exported.getName()] = extractModule(aliased, typeChecker);
            break;
          case ts.SymbolFlags.Interface:
            processInterface(aliased, typeChecker, result);
            break;
        }
        break;
      }
      case ts.SymbolFlags.Interface:
      case ts.SymbolFlags.TypeAlias: {
        processInterface(exported, typeChecker, result);
        break;
      }
      case ts.SymbolFlags.Function: {
        const method = extractFunction(exported, typeChecker);
        if (method) {
          result[exported.getName()] = method;
        }
        break;
      }
    }
  });
  return result;
}
function processInterface(exported, typeChecker, result) {
  const ifaceData = {
    name: exported.getName(),
    methods: { methodOrder: [], required: [], methods: {} },
    properties: {
      properties: {},
      propertyOrder: [],
      required: []
    }
  };
  const type = typeChecker.getDeclaredTypeOfSymbol(exported);
  for (const member of typeChecker.getPropertiesOfType(type)) {
    if (isFromBuiltInType(member)) {
      continue;
    }
    if (isProperty(member)) {
      const [memberType, docs] = typeForSymbol(member, typeChecker);
      if (isHidden(docs)) {
        continue;
      }
      ifaceData.properties.properties[member.getName()] = {
        ...typeDetails(memberType, typeChecker, {
          removeUndefined: isOptional(member)
        }),
        description: docs ? containerToMarkdown(docs.summarySection, docs.customBlocks) : void 0
      };
      ifaceData.properties.propertyOrder.push(member.getName());
      if (!isOptional(member)) {
        ifaceData.properties.required.push(member.getName());
      }
    } else if (isMethod(member)) {
      const method = extractFunction(member, typeChecker);
      if (method) {
        ifaceData.methods.methods[member.getName()] = method;
        ifaceData.methods.methodOrder.push(member.getName());
        if (!isOptional(member)) {
          ifaceData.methods.required.push(member.getName());
        }
      }
    }
  }
  if (Object.keys(ifaceData.methods.methods).length > 0 || Object.keys(ifaceData.properties.properties).length > 0) {
    result[exported.getName()] = ifaceData;
  }
}
function packageToPath(sdkPackage) {
  return path.resolve(`opensource/sdk-js/packages/${sdkPackage}/index.ts`);
}
function extractPackage(sdkPackage, tsProgram) {
  const typeChecker = tsProgram.getTypeChecker();
  const sourceFile = tsProgram.getSourceFile(packageToPath(sdkPackage));
  return extractModule(
    typeChecker.getSymbolAtLocation(sourceFile),
    typeChecker
  );
}
var PACKAGES = [
  "types",
  "react",
  "chatbot-base",
  "chatbot-anthropic",
  "chatbot-openai"
];
var main = async () => {
  const tsCompilerHost = {
    ...ts.createCompilerHost({}),
    // make sure we don't write files
    writeFile: () => {
    },
    // don't give it access to any directories
    getDirectories: () => []
  };
  const tsProgram = ts.createProgram(
    PACKAGES.map(packageToPath),
    {
      target: ts.ScriptTarget.ES2021,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      strictNullChecks: true
    },
    tsCompilerHost
  );
  const schemaOut = Object.fromEntries(
    PACKAGES.map((p) => [p, extractPackage(p, tsProgram)])
  );
  console.log(
    await prettier.format(
      `
// @generated
// npm run docs-codegen
/* eslint-disable */
export default ${JSON.stringify(schemaOut)} as const;`,
      { filepath: "out.ts", ...await prettier.resolveConfig("out.ts") }
    )
  );
};
Promise.resolve(main()).catch((err) => {
  console.error(err);
  process.exit(1);
});

//# sourceMappingURL=docs-extract-tsdoc.js.map
