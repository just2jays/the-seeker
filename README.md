# To Package for Chrome Web Store

Run the following command to package your extension for the Chrome Web Store (from the root of this repo):

```bash
zip -r ../the-seeker.zip . -x "*.git*" "*CHROMEWEBSTORE.md*" "*walkthrough.md*" "*store_assets*" "*PRIVACY.md*" "*website*"
```

This command will create a zip file named `the-seeker.zip` in the parent directory, excluding unnecessary files and directories such as `.git`, documentation files, store assets, and website files.