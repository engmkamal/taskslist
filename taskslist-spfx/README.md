# taskscount

## Summary

Short summary:
A SharePoint SpFx app to view all tasks list assigned to or delegated to respective logged in user's stored in the SharePoint Tasks List.
Used technologies: 1. SpFx, 2.React, 3. @pnp/sp version-3; 4. dataGrid 
 
<p style="text-align: center;"><img src="https://github.com/engmkamal/taskslist/blob/main/taskslist-spfx/src/webparts/taskslistSpfx/assets/taskslist_Output.jpg"></p>

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.17.1-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

> SharePoint Tasks List with columns named 'AssignedTo' and 'DelegateUser' both of field type 'Person or Group' (multiple person) in addition to the columns exists in the Output view.

## Solution

| Solution             | Author(s)                                                                                          |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| [folder name](./src) | Author details (Mostafa Kamal, Berger Tech Consulting Limited, https://www.linkedin.com/in/eng-mkamal) |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.1     | March 10, 2021   | Update comment  |
| 1.0     | January 29, 2021 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install** 
  - **gulp serve**
- Ensure both the dependencies as well as dev-dependencies are being installed properly before running - **gulp serve** 
> Include any additional steps as needed.

## Features

Description of the extension that expands upon high-level summary above.

This extension illustrates the following concepts:

- SharePoint framework SpFx;
- Integration of React with SpFx;
- Implementation of @pnp/sp version-3 library along with data-grid
- Implementation of event binding in Rect Component Class .tsx file with data-grid and SpFx

> Notice that better pictures and documentation will increase the sample usage and the value you are providing for others. Thanks for your submissions advance.

> Share your web part with others through Microsoft 365 Patterns and Practices program to get visibility and exposure. More details on the community, open-source projects and other activities from http://aka.ms/m365pnp.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development

## CLI
Creating new app: yo @microsoft/sharepoint
Run in (https://zlhzl.sharepoint.com/sites/togvloungeuat/_layouts/15/workbench.aspx) : gulp serve --nobrowser
Creating Bundle (for production): gulp bundle --ship                       
Creating SharePoint Package (for production):gulp package-solution --ship

## Environment Setup
Replace existing Tanent url with your Tananet Url in ...\taskscount\config\serve.json file 
Replace existing SharePoint Tasks List veriable named 'LIST_NAME' with your SharePoint Tasks List in .....\taskslist\taskslist-spfx\src\webparts\taskslistSpfx\components\TaskslistSpfx.tsx
