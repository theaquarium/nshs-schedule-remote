import React from 'react';
import {
    IoAdd,
    IoCalendar,
    IoCloudDownload,
    IoCloudUpload,
    IoCog,
    IoTrash,
} from 'react-icons/io5';
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

                        <h2 id="schedule-page">Schedule Page</h2>
                        <h3 id="using-the-schedule">Using the Schedule</h3>
                        <p>
                            The main function of this site is to manage the
                            South schedule for you. You can get to the schedule
                            page at any time by pressing the{' '}
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
                            Using this schedule is mostly automatic. The site
                            will automatically keep track of what time it is and
                            the current block.
                        </p>

                        <h4 id="week-buttons">Week Buttons</h4>

                        <p>
                            The only thing that you have to select manually is
                            the current schedule week. You can select the
                            current week by using the week buttons at the top of
                            the screen. Press{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Week 1
                            </span>{' '}
                            to set week 1 as the current week and press{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Week 2
                            </span>{' '}
                            to set week 2 as the current week.
                        </p>

                        <p>
                            The schedule will try to guess the current week
                            number based on what you've set in the past.
                            However, this will not always be accurate. At the
                            start of every week, please check the week buttons
                            to ensure that they are set correctly. If the
                            current week number is a guess, the schedule will
                            show the phrase&nbsp;
                            <span
                                className="has-text-weight-bold has-text-grey-light"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                What week is it?
                            </span>
                            &nbsp;to prompt you to set the week.
                        </p>

                        <h4 id="schedule-banner">Schedule Banner</h4>

                        <p>
                            The schedule will show the current active or
                            upcoming block on the banner on the schedule page.
                            It will show some information about the block and
                            provide buttons to join the meeting if you have
                            configured login information for the class.
                        </p>

                        <h4 id="block-schedule">Block Schedule</h4>

                        <p>
                            You can view all of the blocks of the day underneath
                            the banner. The active class will be highlighted in
                            blue, and previous classes will be greyed out. You
                            can view the blocks of any other day by selecting
                            the weekday with the weekday tabs.
                        </p>

                        <h4 id="lunches">Lunches</h4>

                        <p>
                            Lunch blocks will show information about lunches on
                            the banner and day schedule cards, and will
                            highlight the current lunch period in dark blue.
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

                        <h2 id="settings">Settings</h2>
                        <h3 id="settings-page">Settings Page</h3>
                        <p>
                            The settings page allows you to configure the
                            schedule and set it up as you wish. Configuring the
                            schedule is optional but will allow you to use
                            features such as keeping track of your Zoom meeting
                            links.
                        </p>

                        <p>
                            You can access the settings page at any time by
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
                            site can also keep track of the Zoom meeting
                            information for all of your classes. You can set
                            this up on the settings page.
                        </p>

                        <p>
                            To set up your classes, navigate to the settings
                            page and scroll down to the{' '}
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
                                Login Type
                            </span>{' '}
                            field to{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                None
                            </span>
                            .
                        </p>
                        <h5 id="automatic-login-mode">Automatic Login Mode</h5>
                        <p>
                            The recommended method of adding meeting login
                            information is by setting the login type to{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Automatic
                            </span>
                            . In Automatic mode, you will need to enter the the
                            Meeting ID of your Zoom meeting and optionally, the
                            meeting password. If you enter the meeting password,
                            it will be automatically entered and you will not
                            need to enter the password when you join the
                            meeting.
                        </p>

                        <p>
                            By default, the schedule assumes that Automatic mode
                            meetings are NPS meetings, but if you would like to
                            use automatic mode to join a meeting outside the NPS
                            domain (meetings where the link doesn't start with{' '}
                            <span className="is-family-monospace">
                                newton-k12-ma-us
                            </span>
                            ), you can uncheck the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Is this an NPS meeting?
                            </span>{' '}
                            field. If you uncheck this, you can optionally enter
                            a custom meeting domain.
                        </p>

                        <p>
                            If you need help configuring automatic mode, press
                            the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Need help?
                            </span>{' '}
                            button and paste the Zoom link you got from your
                            teacher into the Meeting Link field that appears.
                        </p>

                        <h5 id="manual-login-mode">Manual Login Mode</h5>
                        <p>
                            If you would not like to use Automatic mode, you can
                            set the login type to{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Manual
                            </span>
                            , which will allow you to enter a meeting link and
                            optionally, a meeting password.
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
                            You can also configure meeting login information for
                            a Flex Meeting with the same methods as a class,
                            which is described on the{' '}
                            <span
                                className="has-text-weight-bold"
                                style={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Configuring Login Information
                            </span>{' '}
                            section of this page.
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

                        <h3 id="save-load-settings">Save/Load Settings</h3>
                        <p>
                            If you need to move your settings to a new device,
                            you can export your current settings to a file and
                            import them on a new device.
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
                            &nbsp;or message me on Discord at&nbsp;
                            <span className="is-family-monospace">
                                aquarium#9352
                            </span>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
