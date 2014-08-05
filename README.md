# Omni

**Omni** is a website component that provides access to all content and services across our Chapman University networks. It offers universal **navigation** of our core services; it offers intelligent, instant, in-page **search**; and it offers a helpful, personal **profile** that integrates with other Chapman services.

## Navigation

**Navigation** is a touch and click menu for visitors to quickly navigate between Chapman’s core services. These core services are, in order of appearance:

1. Web
- Events
- Stories
- Social

**Web** will link to www.chapman.edu, **Events** will link to events.chapman.edu, **Stories** will link to blogs.chapman.edu, and **Social** will link to social.chapman.edu.

In later versions, this component may be amended to add, modify, or remove core services, as well as provide child flyouts for companion services of their core service.

Differing from the present version, service links will not be labeled by domain, but instead be labeled by name or subject.

## Search

**Search** is a text and keyboard input for visitors to place queries and receive instant results as they type and without the need to load a separate page. Specifically, it will return up to eight results from the following services:

1. Web
- Events
- Stories
- Social

An action item is provided after these links for visitors to be taken to a full page containing many more results.

The search service will be powered by the [Inside](https://github.com/chapmanu/inside) system.

Differing from the present version, the full page of results will also be powered by Inside.

In later versions, this component may be amended to search and return results for organization pages.

## Profile

Profile is a touch and click menu for visitors to quickly login and access their Inside profile, as well as access common services, such as [Blackboard](https://panthermail.chapman.edu/), [PantherMail](https://panthermail.chapman.edu/), and [Webadvisor](https://ariel.chapman.edu/).

This service will be powered by and authenticated by Inside over a secure connection.

In later versions, this component may be amended to allow visitors to manage their communication preferences. It may also be amended to allow for notifications from various Chapman services.

## Appearance and Interaction

**Omni** will appear as a solid bar fixed at the top of the screen. This bar will slide out to disappear after a threshold of downward scrolling and slide in to reappear after a threshold of upward scrolling.

Core components will appear within the **Omni** bar. **Navigation** will appear as a minimal link or button at the left edge, **Search** will appear as a prominent input at the center, and **Profile** will appear as a minimal link or button at the right edge.

Clicking or touching the **navigation** link will open a drop-down list of links to the core services. On smaller screens, other methods of display are under consideration.

Clicking or touching the **Search** input, or alternatively pressing the ?key focuses the input for text entry. As entry is made, predictive results appear in a dropdown list. Each result displays three things. It prominently displays the **title** of the page, left justified, preceded left by an visually assistive **icon**, and subtly followed beneath by the **core service** to which the results belongs beneath. With the input remaining in focus, results may be navigated to using the up and down arrows on a keyboard, where pressing enter or return follows that result. On smaller screens, other methods of display are under consideration.

The **Profile** link will appear as a label and iconage. Logged-in visitors will see their name and avatar. Non-logged-in users will see a login label with assistive iconage as the avatar. Clicking or touching the **Profile** link will open a drop-down list of common services, which may include [Blackboard](https://blackboard.chapman.edu/) [MyWindow](https://mywindow.chapman.edu/), [OrgSync](http://chapman.orgsync.com/), [PantherMail](http://panthermail.chapman.edu/), [Staff & Faculty Email](https://exchange.chapman.edu/), and [WebAdvisor](https://ariel.chapman.edu/WebAdvisor/WebAdvisor), as well as the ability to log out, and a link to manage the profile.

## Future

In later versions, it has also been suggested that a new, site-specific **Companion** be added to **Omni**, which would provide core functionality specific to one Chapman service. This functionality may include both navigation and action links.
