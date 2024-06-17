# GIT FLOW 

This repository contains these long-lived branches:

- ``dev``: for latest development
- ``staging``: for QC & Automation Test involvement
- ``main``: for production

## 1. CREATE NEW BRANCH 

For each user story, member creates new branch from ``dev``:

```bash
git checkout -b <new-branch-name>
```

The naming convention for branch name is described as ``TK-<index>-<title>`` or ``TK-<index>``. 

For example, ``TK-0004-User-is-able-to-log-into-the-system``

## 2. COMMIT & PUSH YOUR WORK

One short-lived branch should contain multiple commits. 

Please follow the naming convention for commit in https://www.conventionalcommits.org/en/v1.0.0/.

## 3. CREATE PULL REQUEST

Please make sure your pull request has no merge conflicts. 

One way is to pull the latest code from ``dev``:

```bash
git pull origin dev
```

Your pull request has the source branch is yours and the target branch is ``dev``.

At the same time, link your pull request with the work item.

## 4. COMPLETE PULL REQUEST

Notice to use Squash & Merge option.

The squash commit should follow this convention: ``TK-0001: Create assets``