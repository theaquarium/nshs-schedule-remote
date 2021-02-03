import React from 'react';
import {
    IoAdd,
    IoApps,
    IoCalendar,
    IoCloudDownload,
    IoCloudUpload,
    IoCog,
    IoTrash,
} from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './Help.css';

import { SidebarMenu } from './SidebarMenu';

export function Help() {
    return (
        <div className="container my-6">
            <div className="mx-3">
                <div className="columns">
                    <div className="column is-one-third">
                        <SidebarMenu />
                    </div>
                    <div className="column content mx-3 is-size-5">
                        <h2 id="nshs-site">NSHS.site</h2>
                        <p>
                            Welcome to nshs.site, a tool to keep track of the
                            new NSHS schedule and help you manage your Zoom
                            links. This page is an extensive guide on how to set
                            up and use the website. If you have any other
                            questions, please feel free to{' '}
                            <HashLink to="#contact-me" smooth>
                                contact me
                            </HashLink>
                            .
                        </p>
                        <h2 id="accessing-this-page">Accessing This Page</h2>
                        <p>
                            You can access this page at any time with the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Need Help?
                            </span>{' '}
                            button at the bottom of the page or the question
                            mark icon in the header.
                        </p>
                        <h2 id="your-data">Your Data</h2>
                        <p>
                            Your privacy is important, so that's why your
                            settings and meeting information will{' '}
                            <strong>never</strong> be sent anywhere. Your
                            settings are stored only on your device, and nobody
                            else (including me) can see them. Take a look at the{' '}
                            <Link to="/privacypolicy">Privacy Policy</Link> for
                            more information.
                        </p>
                        <p>
                            Since your data is stored only on your device, if
                            your settings are lost, there is no way to get them
                            back. For this reason, I recommend making a backup
                            of your settings as described in the{' '}
                            <HashLink to="#download-upload-settings" smooth>
                                Download/Upload Settings
                            </HashLink>{' '}
                            section.
                        </p>
                        <h2 id="schedule-page">Schedule Page</h2>
                        <h3 id="using-the-schedule">Using the Schedule</h3>
                        <p>
                            The main thing this website does is keep track of
                            the South schedule. You can get to the schedule page
                            at any time by pressing the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                <span className="icon mr-1">
                                    <IoCalendar />
                                </span>
                                NSHS Schedule
                            </span>{' '}
                            button at the top left of the screen.
                        </p>
                        <p>
                            On the schedule page, you will see the{' '}
                            <HashLink to="#class-banner" smooth>
                                Class Banner
                            </HashLink>
                            ,{' '}
                            <HashLink to="#week-day-tabs" smooth>
                                Week/Day Tabs
                            </HashLink>
                            , and{' '}
                            <HashLink to="#block-schedule" smooth>
                                Block Schedule
                            </HashLink>
                        </p>
                        <p>
                            Using this schedule is mostly automatic. The site
                            will automatically keep track of what time it is,
                            the current day, week number, and block.
                        </p>
                        <h4 id="class-banner">Class Banner</h4>
                        <p>
                            The Class Banner shows information about the current
                            or upcoming class. If you have a class set up, it
                            may show buttons to join the meeting or view login
                            information.
                        </p>
                        <p>
                            If you have a free block or there is no school, the
                            banner will appear gray.
                        </p>
                        <h4 id="week-day-tabs">Week/Day Tabs</h4>
                        <p>
                            The week and day tabs allow you to select the day to
                            show on the{' '}
                            <HashLink to="#block-schedule" smooth>
                                Block Schedule
                            </HashLink>
                            . The current week and day will be marked.
                        </p>
                        <p>
                            The schedule will automatically switch to the
                            current week and day at the end of the day.
                        </p>
                        <h4 id="block-schedule">Block Schedule</h4>
                        <p>
                            The block schedule allows you to view all of the
                            blocks in a certain day. You can select which day to
                            view using the{' '}
                            <HashLink to="#week-day-tabs" smooth>
                                Week/Day Tabs
                            </HashLink>
                            .
                        </p>
                        <p>
                            The active class will be highlighted, and previous
                            classes will be grayed out.
                        </p>
                        <h4 id="lunches">Lunches</h4>
                        <p>
                            During lunch blocks (B and F), you will see
                            information about lunches on the Class Banner and
                            Block Schedule. The current lunch period will be
                            highlighted. If you select the period when you eat
                            lunch in Settings, your lunch period will be marked.
                        </p>
                        <h4 id="notifications">Notifications</h4>
                        <p>
                            If you enable notifications in Settings, the
                            schedule will send notifications to let you know
                            when classes start. Learn more in the{' '}
                            <HashLink to="#configuring-notifications" smooth>
                                Configuring Notifications
                            </HashLink>{' '}
                            section.
                        </p>
                        <h4 id="joining-meetings">Joining Meetings</h4>
                        <p>
                            If you've set up your meeting links in the schedule,
                            you can join your meetings directly from it. During
                            the school day, you can join the current or upcoming
                            class from the Class Banner by pressing the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Join
                            </span>{' '}
                            button.
                        </p>
                        <p>
                            You can also join meetings from the Block Schedule
                            by pressing the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Join
                            </span>{' '}
                            button on a class card.
                        </p>
                        <p>
                            You can view the meeting password and link by
                            pressing the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Meeting Info
                            </span>{' '}
                            button on the Class Banner or on a class card.
                        </p>
                        <p>
                            You can join Flex Meetings by pressing the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Show Links
                            </span>{' '}
                            button and clicking on the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Join
                            </span>{' '}
                            button on one of the Flex Meeting cards. Just like
                            for classes, you can view more Flex Meeting info by
                            pressing the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Meeting Info
                            </span>{' '}
                            button.
                        </p>
                        <h2 id="additional-meetings">Additional Meetings</h2>
                        <p>
                            You can also use nshs.site to keep track of your
                            personal non-school meetings. To view your
                            additional meetings, press the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                <span className="icon">
                                    <IoApps />
                                </span>
                            </span>{' '}
                            button in the header.
                        </p>
                        <p>
                            Learn more about setting up Additional Meetings in
                            the{' '}
                            <HashLink
                                to="#configuring-additional-meetings"
                                smooth
                            >
                                Configuring Additional Meetings
                            </HashLink>{' '}
                            section.
                        </p>
                        <h2 id="settings">Settings</h2>
                        <h3 id="settings-page">Settings Page</h3>
                        <p>
                            The settings page allows you to configure the
                            schedule and set it up as you wish. Configuring the
                            schedule is completely optional but will allow you
                            to use features such as keeping track of your Zoom
                            meeting links.
                        </p>
                        <p>
                            You can access the Settings page at any time by
                            pressing the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                <span className="icon mr-1">
                                    <IoCog />
                                </span>
                                Settings
                            </span>{' '}
                            button at the top right of the screen.
                        </p>
                        <h3 id="configuring-your-classes">
                            Configuring Your Classes
                        </h3>
                        <p>
                            In addition to keeping track of the schedule, this
                            site can also store the Zoom meeting information for
                            all of your classes. You can set this up on the
                            settings page.
                        </p>
                        <p>
                            To set up your classes, go to the settings page and
                            scroll down to the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Class Blocks
                            </span>{' '}
                            section. From here, click on a class card to open
                            it.
                        </p>
                        <h4 id="setting-class-info">Setting Class Info</h4>
                        <p>
                            If you have a free block during a certain period,
                            you can uncheck the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Do you have class this block?
                            </span>{' '}
                            option.
                        </p>
                        <p>
                            If you do have class during a block, you can enter
                            that class's name into the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Class Name
                            </span>{' '}
                            field.
                        </p>
                        <p>
                            If you have enabled In Person mode on the schedule,
                            you can enter your classroom number and desk number
                            into the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Classroom and Desk Number
                            </span>{' '}
                            field.
                        </p>
                        <h4 id="configuring-login-information">
                            Configuring Login Information
                        </h4>
                        <p>
                            You can add the Zoom meeting information for a class
                            in the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Login Info
                            </span>{' '}
                            field of a class card. Adding meeting information
                            will allow you to join your Zoom meetings directly
                            from the schedule page.
                        </p>
                        <p>
                            If you are using a Chromebook or a mobile device,
                            make sure you turn on the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Turn on this option if you are using a
                                Chromebook or a mobile device
                            </span>{' '}
                            setting. You will not be able to sign in to meetings
                            without it. If you are having issues signing into
                            meeting but are not on a Chromebook, you can still
                            turn this on.
                        </p>
                        <h5 id="no-login">No Login</h5>
                        <p>
                            If you would not like to store the login information
                            for a class in the schedule, set the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Store login info for this meeting?
                            </span>{' '}
                            setting to off.
                        </p>
                        <h5 id="entering-login-information">
                            Entering Login Information
                        </h5>
                        <p>
                            If you would like to store login information in the
                            schedule, set the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Store login info for this meeting?
                            </span>{' '}
                            setting to on.
                        </p>
                        <p>
                            Paste your meeting link into the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Meeting Link
                            </span>{' '}
                            field.
                        </p>
                        <p>
                            If your meeting has a password, enter the password
                            into the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Password
                            </span>{' '}
                            field.
                        </p>
                        <h3 id="setting-up-hybrid">Setting Up Hybrid</h3>
                        <p>
                            If you're attending South in person, you can set up
                            your in person days on the schedule. Turn on the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Do you attend school in person?
                            </span>{' '}
                            setting to activate in person days. You can then
                            click on the days you will be at school to mark them
                            as in person days.
                        </p>
                        <p>
                            If you enable hybrid on the schedule, you will have
                            the option to keep track of your classroom number
                            and desk number in the schedule. To do this, open a
                            class card and enter your classroom number on the
                            left and desk number on the right of the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Classroom and Desk Number
                            </span>{' '}
                            field. You can also enter your classroom number for
                            flex block in the Flex Meetings section.
                        </p>
                        <h3 id="configuring-flex-meetings">
                            Configuring Flex Meetings
                        </h3>
                        <p>
                            You can also configure any Flex Block meetings that
                            you have on the settings page. Click the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                <span className="icon mr-1">
                                    <IoAdd />
                                </span>
                                Add Flex Meeting
                            </span>{' '}
                            button to add a flex meeting.
                        </p>
                        <p>
                            Click on the card of the Flex Meeting you just
                            created to open its settings. You should give your
                            Flex Meeting a name so that you can recognize it.
                        </p>
                        <p>
                            You can put in the meeting information for your Flex
                            Meeting as described in the{' '}
                            <HashLink
                                to="#configuring-login-information"
                                smooth
                            >
                                Configuring Login Information
                            </HashLink>{' '}
                            section.
                        </p>
                        <p>
                            You can delete a Flex Meeting by pressing the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                <span className="icon mr-1">
                                    <IoTrash />
                                </span>
                                Delete Flex Meeting
                            </span>{' '}
                            button at the bottom of a Flex Meeting settings
                            card.
                        </p>
                        <h3 id="configuring-additional-meetings">
                            Configuring Additional Meetings
                        </h3>
                        <p>
                            You can configure Additional Meetings on the
                            settings page. To add a new Additional Meeting,
                            click the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                <span className="icon mr-1">
                                    <IoAdd />
                                </span>
                                Add Additional Meeting
                            </span>{' '}
                            button.
                        </p>
                        <p>
                            Click on the card of the Additional Meeting you just
                            created to open its settings. You should give your
                            Additional Meeting a name so that you can recognize
                            it.
                        </p>
                        <p>
                            You can put in the meeting information for your
                            Additional Meeting as described in the{' '}
                            <HashLink
                                to="#configuring-login-information"
                                smooth
                            >
                                Configuring Login Information
                            </HashLink>{' '}
                            section.
                        </p>
                        <p>
                            You can delete a Additional Meeting by pressing the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                <span className="icon mr-1">
                                    <IoTrash />
                                </span>
                                Delete Additional Meeting
                            </span>{' '}
                            button at the bottom of a Additional Meeting
                            settings card.
                        </p>
                        <h3 id="configuring-lunches">Configuring Lunches</h3>
                        <p>
                            You can select which period you eat lunch during in
                            the Lunches section of the settings page. For each
                            lunch block, click on 1st, 2nd, or 3rd to select it.
                        </p>
                        <h3 id="configuring-notifications">
                            Configuring Notifications
                        </h3>
                        <p>
                            You can set up the schedule to send you
                            notifications when classes or lunches start. To
                            enable notifications, turn on the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Enable Class Notifications?
                            </span>{' '}
                            setting. If you would like to receive notifications
                            for when lunches start, turn on the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Send Notifications for Lunch Blocks?
                            </span>{' '}
                            setting.
                        </p>
                        <p>
                            In order to receive notifications, you will need to
                            grant nshs.site the permission to send
                            notifications. When you enable notifications, a
                            popup should appear near the URL bar of your browser
                            to ask if you would like to allow notifications.
                            Select Allow to turn on notifications.
                        </p>
                        <p>
                            If the site detects that it does not have the
                            permission, it will show a button to{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Grant Permission
                            </span>
                            . This permission must be granted to send
                            notifications.
                        </p>
                        <p>
                            If you need any help enabling this, please feel free
                            to{' '}
                            <HashLink to="#contact-me" smooth>
                                contact me
                            </HashLink>
                            .
                        </p>
                        <h3 id="motivational-phrases">Motivational Phrases</h3>
                        <p>
                            The schedule will show short motivational phrases at
                            the top of the screen. If you would like to turn
                            this off, you can do so by turning off the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Show Motivational Phrases?
                            </span>{' '}
                            option on the settings page.
                        </p>
                        <h3 id="download-upload-settings">
                            Download/Upload Settings
                        </h3>
                        <p>
                            If you need to move your settings to a new device or
                            would like to back up your settings, you can export
                            your current settings to a file and import them on a
                            new device.
                        </p>
                        <p>
                            To save your settings to a file, click the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                <span className="icon mr-1">
                                    <IoCloudDownload />
                                </span>
                                Export Settings
                            </span>{' '}
                            button and a settings file will be downloaded.
                        </p>
                        <p>
                            To import a settings file, click the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                <span className="icon mr-1">
                                    <IoCloudUpload />
                                </span>
                                Import Settings
                            </span>{' '}
                            button and you will be prompted to import the
                            settings. Please note: your current settings will be
                            overwritten if you choose to import settings from a
                            file.
                        </p>
                        <h3 id="chromebooks-mobile-devices">
                            Chromebooks/Mobile Devices
                        </h3>
                        <p>
                            If you're using a Chromebook or a mobile device,
                            make sure that the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Turn on this option if you are using a
                                Chromebook or a mobile device
                            </span>{' '}
                            setting is enabled. You will not be able to sign in
                            to meetings if it is off.
                        </p>
                        <h3 id="color-theme">Color Theme</h3>
                        <p>
                            By default, the schedule uses dark mode. However,
                            you can switch to a light version of the site on the
                            settings page.
                        </p>
                        <h3 id="resetting">Resetting</h3>
                        <p>
                            You can reset your settings to their default values
                            at any time by pressing the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Reset Settings
                            </span>{' '}
                            button on the settings page.
                        </p>
                        <p>
                            Some issues with the schedule can be caused by a
                            corrupted state. If you experience an issue with the
                            schedule, you can try resetting the app state with
                            the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Reset App State
                            </span>{' '}
                            button on the settings page. Resetting the app state
                            will not clear any of your settings and will only
                            reload the schedule.
                        </p>
                        <h2 id="other-info">Other Info</h2>
                        <h3 id="contact-me">Contact Me</h3>
                        <p>
                            If you have any other questions, please contact me
                            at&nbsp;
                            <a href="mailto:peter@vashevko.com">
                                peter@vashevko.com
                            </a>
                            &nbsp;or{' '}
                            <a href="https://discord.gg/KXxZt2BPUF">
                                join the Discord server
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
