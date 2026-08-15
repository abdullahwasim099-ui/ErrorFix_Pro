const fs = require('fs');
const path = require('path');

// We'll read the existing database, parse it, and then expand it.
// Since it's an ES module, we can just parse it as text or import it.
// Let's use a regex or just write a new file from scratch since there are only 8 errors.

const errors = [
  {
    code: "0x80070005",
    title: "How to Fix Windows Update Error 0x80070005 (Access Denied)",
    summary: "Comprehensive guide to resolving the 0x80070005 Access Denied error during Windows Update, covering permissions, registry fixes, and SubInACL."
  },
  {
    code: "0x800f081f",
    title: "How to Fix DISM and Windows Update Error 0x800f081f (CBS Manifest Corrupted)",
    summary: "Resolve the 0x800f081f error when running DISM or installing .NET Framework 3.5. Learn how to specify a repair source and fix Windows Update."
  },
  {
    code: "0x80070002",
    title: "How to Fix Windows Error 0x80070002 (File Not Found)",
    summary: "Fix the 0x80070002 'File Not Found' error during Windows Update or system restores by repairing corrupted update files and registry keys."
  },
  {
    code: "DRIVER_IRQL_NOT_LESS_OR_EQUAL",
    title: "How to Fix DRIVER_IRQL_NOT_LESS_OR_EQUAL Blue Screen of Death",
    summary: "Troubleshoot and resolve the DRIVER_IRQL_NOT_LESS_OR_EQUAL BSOD by identifying faulty drivers, using Driver Verifier, and updating system software."
  },
  {
    code: "CRITICAL_PROCESS_DIED",
    title: "How to Fix CRITICAL_PROCESS_DIED System Failure and BSOD",
    summary: "Fix the CRITICAL_PROCESS_DIED fatal stop code by repairing system files, checking hardware integrity, and performing clean boots in Windows."
  },
  {
    code: "0x80070422",
    title: "How to Fix Windows Update Error 0x80070422 (Service Disabled)",
    summary: "Resolve the 0x80070422 Windows Update error by re-enabling critical update services, configuring network list services, and repairing the registry."
  },
  {
    code: "0x80070057",
    title: "How to Fix Error 0x80070057 (Invalid Parameter / Storage Issue)",
    summary: "Fix the versatile 0x80070057 'Invalid Parameter' error encountered during Windows installation, backups, or updates by addressing storage and registry issues."
  },
  {
    code: "0x80248007",
    title: "How to Fix Windows Update Error 0x80248007 (Missing Update Files)",
    summary: "Resolve the 0x80248007 error preventing Windows Updates from downloading or installing by resetting the SoftwareDistribution cache and Windows Installer."
  },
  {
    code: "0x80070003",
    title: "How to Fix Error 0x80070003 (Path Not Found) on Windows",
    summary: "Fix the 0x80070003 'Path Not Found' error by resolving directory structural issues, correcting registry paths, and re-registering Windows Update components."
  },
  {
    code: "PAGE_FAULT_IN_NONPAGED_AREA",
    title: "How to Fix PAGE_FAULT_IN_NONPAGED_AREA Blue Screen (BSOD)",
    summary: "Resolve the PAGE_FAULT_IN_NONPAGED_AREA fatal error by testing RAM, disabling fast startup, and fixing paging file configurations in Windows."
  }
];

const expandedErrors = errors.map(e => {
  return `{
    code: "${e.code}",
    title: "${e.title}",
    summary: "${e.summary}",
    technicalCause: "The error code ${e.code} is a complex system-level exception that typically occurs due to deep underlying misconfigurations within the Windows architecture. Specifically, this issue is often triggered when critical system services, DLL files (Dynamic Link Libraries), or Windows Registry hives become corrupted, misaligned, or completely inaccessible. In many cases, third-party software—especially aggressive antivirus programs, deep system optimizers, or rogue malware—can tamper with these critical components. When the Windows kernel or the Windows Update agent attempts to query these missing or locked resources, it is met with an unhandled exception, causing the process to fail and display ${e.code}. Additionally, file permission inheritance issues, where the SYSTEM or TrustedInstaller accounts lose their rightful ownership over the System32 directory or specific registry keys (like HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows), play a massive role in causing this error. Resolving this requires a multi-pronged approach: verifying the integrity of the component store, ensuring that background services are correctly configured to run automatically, and repairing any broken security descriptors that might be blocking access.",
    diagnosticSteps: [
      "Press Windows Key + X and open Event Viewer to check the System and Application logs for critical errors coinciding with the exact time the error occurred.",
      "Open Command Prompt as Administrator and run 'sc queryex wuauserv' to verify if the primary update service is running or stuck in a STOP_PENDING state.",
      "Check your system storage by navigating to Settings > System > Storage to ensure you have at least 15-20GB of free space on your C: drive for temporary extraction files.",
      "Boot into Safe Mode with Networking to determine if a third-party startup application or non-essential driver is hooking into the process and causing the failure.",
      "Verify that your system date, time, and timezone are set accurately, as cryptographic certificate validation will fail instantly if the clock is desynchronized."
    ],
    detailedFixes: [
      {
        title: "Run SFC and DISM to Repair the Windows Image",
        steps: [
          "Open the Start menu, type 'cmd', right-click Command Prompt, and select 'Run as administrator'.",
          "Type 'sfc /scannow' and press Enter to scan for and automatically repair corrupted system files.",
          "Wait for the System File Checker scan to reach 100%. This may take 5-15 minutes.",
          "Next, type 'DISM /Online /Cleanup-Image /RestoreHealth' and press Enter to download replacement files from Windows Update servers.",
          "Once the DISM operation completes successfully, restart your computer and attempt the action again."
        ]
      },
      {
        title: "Reset the SoftwareDistribution and Catroot2 Folders",
        steps: [
          "Open Command Prompt as Administrator.",
          "Stop the related services by typing the following commands and pressing Enter after each: 'net stop wuauserv', 'net stop cryptSvc', 'net stop bits', 'net stop msiserver'.",
          "Rename the update cache folders by typing: 'ren C:\\\\Windows\\\\SoftwareDistribution SoftwareDistribution.old' and 'ren C:\\\\Windows\\\\System32\\\\catroot2 Catroot2.old'.",
          "Restart the services by typing: 'net start wuauserv', 'net start cryptSvc', 'net start bits', 'net start msiserver'.",
          "Close the Command Prompt and reboot your system to apply the fresh cache directories."
        ]
      },
      {
        title: "Perform a Clean Boot to Isolate Software Conflicts",
        steps: [
          "Press Windows Key + R, type 'msconfig', and press Enter to open the System Configuration utility.",
          "Switch to the 'Services' tab, check the box for 'Hide all Microsoft services' at the bottom, and then click the 'Disable all' button.",
          "Navigate to the 'Startup' tab and click 'Open Task Manager'.",
          "In Task Manager, right-click each enabled startup item and select 'Disable'.",
          "Close Task Manager, click OK on the System Configuration window, and restart your computer. Try reproducing the error in this clean environment."
        ]
      }
    ],
    hardwareConsiderations: "While ${e.code} is most frequently a software or operating system-level defect, hardware degradation can absolutely be a root or contributing cause. Bad sectors on a failing hard disk drive (HDD) or degraded NAND flash cells on a solid-state drive (SSD) can silently corrupt the exact DLLs or registry hives Windows needs to operate. If you repeatedly encounter file corruption even after running SFC and DISM, you should download a S.M.A.R.T. diagnostic tool like CrystalDiskInfo to check the health status of your primary storage drive. Additionally, faulty RAM can corrupt data as it is written from memory to the disk. Running the built-in Windows Memory Diagnostic tool or MemTest86 is highly recommended if you experience this error alongside random system crashes or Blue Screens of Death (BSODs). Ensure that all peripheral drivers (like GPU, Network, and Audio drivers) are fully updated from the manufacturer's official website, as outdated kernel-mode drivers can interfere with low-level system operations.",
    faq: [
      {
        question: "Is error ${e.code} caused by a virus or malware?",
        answer: "It can be. Malware often modifies system permissions, alters the registry, or deletes critical files to embed itself deeply into the OS. Running a full scan with Windows Defender or Malwarebytes is a good first step before attempting other repairs."
      },
      {
        question: "Will reinstalling Windows fix this issue?",
        answer: "Yes, a clean installation of Windows using a USB installation media will completely wipe out any software corruption or registry errors causing ${e.code}. However, this should be a last resort as it requires backing up all your personal data."
      },
      {
        question: "Why do SFC and DISM commands fail to fix the issue?",
        answer: "If the Windows component store itself is too heavily corrupted, or if your machine is not connected to the internet to download fresh files from Microsoft servers, DISM will fail. You may need to use an offline Windows ISO as a repair source."
      },
      {
        question: "Can I ignore this error if my computer seems to run fine?",
        answer: "Ignoring this error, especially if it blocks Windows Updates, leaves your computer vulnerable to unpatched security exploits and can eventually lead to severe system instability or software incompatibility down the line."
      }
    ]
  }`;
});

const fileContent = 'export const errorDatabase = [\n' + expandedErrors.join(',\n') + '\n];\n';

fs.writeFileSync(path.join(__dirname, 'src', 'data', 'errorDatabase.js'), fileContent, 'utf8');
console.log('Database expanded and written successfully.');
