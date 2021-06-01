<!-- omit in toc -->
<h1 align="center" style="font-size:42px;border-bottom:none;">
  Bee Green
</h1>
<h3 align="center" style="border-bottom: 1px solid #eaecef;">
  Empower individuals to Innovate and BuildUP a resilient society together
</h3>


> This package was implemented using [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), and [LoopBack 4](https://loopback.io/doc/en/lb4/)
> and uses the [IBM Carbon Design System](https://www.carbondesignsystem.com/).
> The database used for all data storage is [IBM Cloudant](https://www.ibm.com/cloud/cloudant).

<!-- Quick Links -->
<div align="center">
<a href="https://youtu.be/Tf7JL9LKUZc">View Demo</a>
·
<a href="https://github.com/narayanacoder/BuildUP/issues">Report Bug</a>
</div>

----

[![License](https://img.shields.io/badge/License-Apache2-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)


## Authors

- [Linda Camillo](https://www.linkedin.com/in/linda-c-3625056/)
- [Narayana Madineni](https://www.linkedin.com/in/narayana-m-696b6230/)
- [Jessica Nahulan](https://www.linkedin.com/in/jessicanahulan/)
- [Jessika Welch](https://www.linkedin.com/in/jessika-welch/)


<!-- omit in toc -->
## Table of Contents
- [Authors](#authors)
- [Overview](#overview)
  - [Background](#background)
- [Try out our Extension yourself!](#try-out-our-extension-yourself)
- [Contributing](#contributing)
  - [Prerequisites](#prerequisites)
  - [Starting the Extension dev server](#starting-the-extension-dev-server)
  - [Loading The Extension on Chrome](#loading-the-extension-on-chrome)
  - [Start contributing code](#start-contributing-code)
  - [1. Understand our Git workflow model](#1-understand-our-git-workflow-model)
  - [2. Always work on a branch](#2-always-work-on-a-branch)
    - [Branch Naming Conventions](#branch-naming-conventions)

----

## Overview

### Background

## Try out our Extension yourself!

Do you want to try out our extension, without needing to connect to a server and without having to set up a dev environment? Then follow these steps:

1. Download the `Extension/productionDist` zip file found in this repository, and unzip the folder.
2. Open Chrome and navigate to `chrome://extensions/`
3. Toggle on `Developer mode` in the top right corner
4. Click `Load unpacked`
5. Select the entire `productionDist` folder

## Contributing

### Prerequisites

Before contributing to this repository, you will need the following tools installed:

- Register for an [IBM Cloud](https://www.ibm.com/account/reg/us-en/signup?formid=urx-42793&eventid=cfc-2020?cm_mmc=OSocial_Blog-_-Audience+Developer_Developer+Conversation-_-WW_WW-_-cfc-2020-ghub-starterkit-cooperation_ov75914&cm_mmca1=000039JL&cm_mmca2=10008917) account.
- Install and configure [IBM Cloud CLI](https://cloud.ibm.com/docs/cli?topic=cloud-cli-getting-started#overview).
- Clone this repo [repository](https://github.com/JessNah/BeeGreen)
- [Node.js](https://nodejs.org/en/download/) (We recommended using v10 or above).
   Click [here](https://nodejs.org/en/download/package-manager/) if you wish to install via package manager.
  - If you're on a macOS, we recommend using
    [`nvm`](https://github.com/nvm-sh/nvm) to help manage different versions of
    Node.js
- [Git](https://git-scm.com/download/win). Learn more about Git [here](https://www.atlassian.com/git/tutorials/what-is-git).

### Starting the Extension dev server

To test your changes, navigate to the Extension folder in your local cloned repo directory, ie. `Github/BeeGreen/Extension`, and then you will need to run:

```
npm install
npm run start
```

This will build and transpile the Extension code, the output will be placed in the `Extension/dist` folder.

### Loading The Extension on Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Toggle on `Developer mode` in the top right corner
3. Click `Load unpacked`
4. Select the entire `dist` folder

### Start contributing code

### 1. Understand our Git workflow model

When it comes to code contributions, we generally follow the Gitflow workflow model: https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow.

### 2. Always work on a branch

When contributing to this package, your work should always be done in a new branch. For all development of this library we use feature branches.

What are feature branches: https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow

Each new feature should always reside in its own branch. But, instead of branching off of master, feature branches use development branch as their parent branch. When a feature is complete, it gets merged back into development. Features should never interact directly with master.

When your work is done, submit your pull request and once it has been approved, you can merge your branch with the development branch.

#### Branch Naming Conventions
Follow this pattern exactly so that searching is easier:
<prefix>/<usecase>-<summary> 


Prefix  |   Use Case
---     |   ---
feature |   New feature addition
defect	|   Bug or defect fix
wip	    |   Works in progress
junk    |	Throwaway branch created to experiment

Example branch name:

feature/new-component