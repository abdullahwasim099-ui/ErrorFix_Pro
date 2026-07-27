export const errorDatabase = [
  {
    code: "0x80070005",
    title: "How to Fix Windows Update Error 0x80070005 (Access Denied)",
    summary: "Comprehensive guide to resolving the 0x80070005 Access Denied error during Windows Update, covering permissions, registry fixes, and SubInACL.",
    overview: "The error code 0x80070005 is widely known among Windows users as the 'Access Denied' error. It typically occurs when a user lacks the necessary file or registry permissions to perform a specific action, such as installing Windows Updates, upgrading the operating system, or modifying certain system files. This issue can stem from misconfigured administrator privileges, aggressive third-party antivirus software blocking system modifications, or malware that has tampered with the security descriptors of your Windows registry. When Windows Update attempts to download and apply new patches, it requires elevated permissions to write to the System32 directory and registry hives. If these permissions are missing or corrupted, the process halts immediately, throwing the 0x80070005 exception. Resolving this issue fundamentally requires restoring the correct security permissions, disabling conflicting security software, and ensuring that the Windows Update components are functioning properly in a clean state.",
    detailedFixes: [
      {
        title: "Reset Windows Update Components",
        steps: [
          "Open the Start menu, type 'cmd', right-click on Command Prompt, and select 'Run as administrator'.",
          "Stop the BITS, Cryptographic, MSI Installer and the Windows Update Services by typing: net stop wuauserv, net stop cryptSvc, net stop bits, net stop msiserver (press Enter after each).",
          "Rename the SoftwareDistribution and Catroot2 folders to force Windows to recreate them: ren C:\\Windows\\SoftwareDistribution SoftwareDistribution.old and ren C:\\Windows\\System32\\catroot2 Catroot2.old.",
          "Restart the services by typing: net start wuauserv, net start cryptSvc, net start bits, net start msiserver.",
          "Restart your PC and try updating again."
        ]
      },
      {
        title: "Run SubInACL Tool to Fix File and Registry Permissions",
        steps: [
          "Download the SubInACL tool from the official Microsoft download center.",
          "Install it to the default path (C:\\Program Files (x86)\\Windows Resource Kits\\Tools).",
          "Open a new Notepad file and type the script to reset permissions across HKEY_LOCAL_MACHINE, HKEY_CURRENT_USER, and the System Drive.",
          "Save the file as 'reset.cmd' and run it as an administrator.",
          "Wait for the script to process all files and registry keys, which may take several minutes."
        ]
      },
      {
        title: "Temporarily Disable Antivirus and Run SFC",
        steps: [
          "Turn off any third-party antivirus software temporarily from its system tray icon.",
          "Open Command Prompt as Administrator.",
          "Type 'sfc /scannow' and press Enter to scan for and repair corrupted system files.",
          "Once the scan reaches 100%, run 'DISM /Online /Cleanup-Image /RestoreHealth'.",
          "Restart the computer, attempt the update, and re-enable your antivirus."
        ]
      }
    ],
    faq: [
      {
        question: "Can an antivirus cause error 0x80070005?",
        answer: "Yes, overly aggressive third-party antivirus suites can lock down critical system files and registry keys to prevent malware infections, inadvertently blocking legitimate Windows Updates."
      },
      {
        question: "Will I lose my files if I reset Windows Update?",
        answer: "No, resetting the Windows Update components only clears the temporary update cache (SoftwareDistribution folder). Your personal files and installed applications remain completely safe."
      },
      {
        question: "Does this error occur in Windows 11 as well?",
        answer: "Yes, the 0x80070005 error is present across Windows 7, 8, 10, and 11, as they all share the same underlying NTFS file system and registry architecture."
      }
    ]
  },
  {
    code: "0x800f081f",
    title: "How to Fix DISM and Windows Update Error 0x800f081f (CBS Manifest Corrupted)",
    summary: "Resolve the 0x800f081f error when running DISM or installing .NET Framework 3.5. Learn how to specify a repair source and fix Windows Update.",
    overview: "Error 0x800f081f typically surfaces when using the Deployment Image Servicing and Management (DISM) tool or when attempting to install the .NET Framework 3.5 on Windows 10 and Windows 11. This error explicitly indicates that the operating system is unable to locate the source files required to restore a corrupted Windows image or install a specific optional feature. When you run a command like 'DISM /Online /Cleanup-Image /RestoreHealth', Windows attempts to download the necessary repair files through Windows Update. If your Windows Update client is broken, if your machine is behind a restrictive corporate WSUS server, or if your internet connection is unstable, DISM will fail to fetch the files and will display error 0x800f081f. Additionally, when installing .NET 3.5, the system might not find the payload in the local component store (WinSxS folder). Fixing this usually involves pointing DISM to a mounted Windows ISO or fixing the Windows Update configuration.",
    detailedFixes: [
      {
        title: "Use a Windows ISO as a Repair Source",
        steps: [
          "Download the official Windows ISO that matches your exact build version from the Microsoft website.",
          "Double-click the ISO file to mount it. Note the assigned drive letter (e.g., E:).",
          "Open Command Prompt as Administrator.",
          "Run the DISM command specifying the source: 'DISM /Online /Cleanup-Image /RestoreHealth /Source:WIM:E:\\sources\\install.wim:1 /LimitAccess'. Make sure to replace 'E:' with your actual drive letter.",
          "Wait for the operation to complete successfully."
        ]
      },
      {
        title: "Install .NET Framework 3.5 Offline via Command Prompt",
        steps: [
          "Mount the Windows ISO file as mentioned in the previous fix.",
          "Open Command Prompt as Administrator.",
          "Run the following command: 'dism.exe /online /enable-feature /featurename:NetFX3 /Source:E:\\sources\\sxs /LimitAccess'. (Replace E: with your mounted drive letter).",
          "Once the installation reaches 100%, restart your computer."
        ]
      },
      {
        title: "Clean Up the Component Store",
        steps: [
          "Open Command Prompt as Administrator.",
          "Execute 'DISM /Online /Cleanup-Image /StartComponentCleanup' to clean up superseded components and reduce the size of the component store.",
          "Follow up with 'sfc /scannow' to verify file integrity.",
          "Attempt your original Windows Update or .NET Framework installation again."
        ]
      }
    ],
    faq: [
      {
        question: "Why does DISM fail to download files automatically?",
        answer: "DISM relies on Windows Update to fetch payload files. If Windows Update is disabled, corrupted, or intercepted by a corporate firewall, the automatic download will fail."
      },
      {
        question: "Can I use an older Windows ISO for the source?",
        answer: "No, the repair source MUST match the exact version, edition, and language of the Windows operating system currently installed on your PC."
      },
      {
        question: "What does the /LimitAccess flag do?",
        answer: "The /LimitAccess flag forces DISM to strictly use the local source path you provided and prevents it from trying to contact Windows Update online."
      }
    ]
  },
  {
    code: "0x80070002",
    title: "How to Fix Windows Error 0x80070002 (File Not Found)",
    summary: "Fix the 0x80070002 'File Not Found' error during Windows Update or system restores by repairing corrupted update files and registry keys.",
    overview: "The 0x80070002 error is a common Windows issue that literally translates to 'ERROR_FILE_NOT_FOUND'. It occurs when the operating system attempts to access a specific file or directory that is missing, corrupted, or inaccessible due to incorrect permissions. This problem is most frequently encountered during Windows Update installations, System Restores, or when attempting to launch specific Microsoft Store applications. During an update, if a downloaded patch file goes missing from the SoftwareDistribution folder or if there is a discrepancy between the update database and the physical files on your drive, Windows will halt the process and display this error. Additionally, aggressive disk cleanup tools or malware might inadvertently delete critical system files, causing operations that rely on them to fail. Resolving 0x80070002 usually involves clearing the corrupted update cache, verifying system file integrity, or checking the system's date and time settings, which can cause synchronization issues.",
    detailedFixes: [
      {
        title: "Clear the Windows Update Cache",
        steps: [
          "Press Windows Key + R, type 'services.msc', and press Enter.",
          "Find 'Windows Update', right-click it, and select 'Stop'.",
          "Open File Explorer and navigate to 'C:\\Windows\\SoftwareDistribution\\DataStore'. Delete all files and folders inside.",
          "Navigate to 'C:\\Windows\\SoftwareDistribution\\Download' and delete all contents there as well.",
          "Go back to the Services window, right-click 'Windows Update', and select 'Start'."
        ]
      },
      {
        title: "Synchronize System Date and Time",
        steps: [
          "Right-click the date and time display on your taskbar and select 'Adjust date/time'.",
          "Ensure that 'Set time automatically' and 'Set time zone automatically' are turned on.",
          "Click the 'Sync now' button under the Synchronize your clock section.",
          "If synchronization fails, open Command Prompt as Administrator and run: 'net stop w32time', 'w32tm /unregister', 'w32tm /register', 'net start w32time', 'w32tm /resync'."
        ]
      },
      {
        title: "Run SFC and DISM to Replace Missing Files",
        steps: [
          "Open Command Prompt as an Administrator.",
          "Type 'sfc /scannow' and press Enter to scan for missing or corrupted system files.",
          "Once complete, run 'DISM /Online /Cleanup-Image /RestoreHealth'.",
          "Reboot the system and try performing the failing action again."
        ]
      }
    ],
    faq: [
      {
        question: "Does 0x80070002 mean my hard drive is failing?",
        answer: "Not necessarily. While file corruption can be a symptom of a failing drive, this error is most often caused by software glitches, incomplete downloads, or temporary registry inconsistencies."
      },
      {
        question: "Can incorrect time settings really cause update failures?",
        answer: "Yes, Windows Update requires a secure connection to Microsoft servers via SSL/TLS certificates. If your system clock is significantly out of sync, the certificates will be rejected as invalid."
      },
      {
        question: "Will deleting the DataStore folder erase my update history?",
        answer: "Yes, clearing the DataStore folder will remove your visual update history from the Settings app, but it will not uninstall any updates that have already been applied to your system."
      }
    ]
  },
  {
    code: "DRIVER_IRQL_NOT_LESS_OR_EQUAL",
    title: "How to Fix DRIVER_IRQL_NOT_LESS_OR_EQUAL Blue Screen of Death",
    summary: "Troubleshoot and resolve the DRIVER_IRQL_NOT_LESS_OR_EQUAL BSOD by identifying faulty drivers, using Driver Verifier, and updating system software.",
    overview: "The DRIVER_IRQL_NOT_LESS_OR_EQUAL bug check is one of the most notorious Blue Screen of Death (BSOD) errors in the Windows ecosystem. This fatal system error occurs when a kernel-mode driver attempts to access pageable memory at a process Interrupt Request Level (IRQL) that is too high. In simpler terms, a poorly coded, outdated, or corrupted hardware driver is trying to read or write memory that it has no permission to access at that specific time, causing the Windows kernel to crash immediately to protect the system from further data corruption. This issue is frequently triggered by malfunctioning network adapters, graphics cards, audio interfaces, or even aggressive third-party antivirus software acting as filter drivers. Diagnosing this error requires analyzing minidump files to pinpoint the exact driver causing the crash (often ending in .sys, such as ndis.sys or nvlddmkm.sys) and either updating it, rolling it back, or replacing the faulty hardware component entirely.",
    detailedFixes: [
      {
        title: "Update or Reinstall Faulty Drivers",
        steps: [
          "Press Windows Key + X and select 'Device Manager'.",
          "Look for any devices with a yellow exclamation mark, which indicates a driver issue.",
          "Right-click the problematic device and select 'Update driver', then choose 'Search automatically for drivers'.",
          "If updating fails, right-click and select 'Uninstall device', ensure 'Delete the driver software for this device' is checked, and restart your PC.",
          "Windows will automatically reinstall a fresh generic driver upon reboot."
        ]
      },
      {
        title: "Run the Driver Verifier Tool",
        steps: [
          "Open the Start menu, type 'verifier', and hit Enter to launch the Driver Verifier Manager.",
          "Select 'Create standard settings' and click Next.",
          "Choose 'Automatically select all drivers installed on this computer' and click Finish.",
          "Restart your computer. Windows will heavily stress-test drivers as they load.",
          "If the system crashes, note the exact .sys file mentioned on the BSOD screen, boot into Safe Mode, and type 'verifier /reset' in Command Prompt to disable it."
        ]
      },
      {
        title: "Uninstall Third-Party Antivirus Software",
        steps: [
          "Boot into Windows or Safe Mode.",
          "Press Windows Key + R, type 'appwiz.cpl', and hit Enter.",
          "Locate your third-party antivirus (e.g., McAfee, Norton, Avast) in the list.",
          "Right-click and select 'Uninstall'. Follow the prompts and use the vendor's official removal tool if necessary.",
          "Reboot and allow Windows Defender to take over protection."
        ]
      }
    ],
    faq: [
      {
        question: "Can RAM issues cause this BSOD?",
        answer: "Yes, while it's primarily a driver issue, faulty or improperly seated RAM modules can corrupt data as it moves through memory, leading the system to blame a driver for the invalid memory access."
      },
      {
        question: "How do I find out which driver caused the crash?",
        answer: "You can use a free utility like BlueScreenView or WhoCrashed to analyze the memory dump files located in C:\\Windows\\Minidump. These tools highlight the exact driver file that triggered the crash."
      },
      {
        question: "Is it safe to update BIOS to fix this?",
        answer: "Updating the BIOS can resolve deep-seated hardware compatibility issues that lead to this error. However, it carries a small risk; ensure your PC is plugged into a stable power source before flashing the BIOS."
      }
    ]
  },
  {
    code: "CRITICAL_PROCESS_DIED",
    title: "How to Fix CRITICAL_PROCESS_DIED System Failure and BSOD",
    summary: "Fix the CRITICAL_PROCESS_DIED fatal stop code by repairing system files, checking hardware integrity, and performing clean boots in Windows.",
    overview: "The CRITICAL_PROCESS_DIED bug check is a severe Windows 10 and 11 BSOD error that halts your system entirely. It signifies that a fundamental system process—one that Windows absolutely requires to function—has unexpectedly terminated, failed, or become corrupted. The Windows kernel monitors several key background processes, such as wininit.exe, winlogon.exe, csrss.exe, and services.exe. If any of these processes crash, the kernel instantly brings down the entire operating system to prevent catastrophic data loss or security breaches. The root causes of this error are varied and can range from heavily corrupted system files and failing storage drives (SSD/HDD) to deeply embedded malware that terminates security processes, or severely conflicting third-party system utilities. Because the system crashes so abruptly, it may sometimes fail to even generate a memory dump. Fixing this error usually requires leveraging built-in Windows recovery tools like SFC and DISM, performing a clean boot to isolate rogue software, or diagnosing failing hardware.",
    detailedFixes: [
      {
        title: "Run SFC and DISM Scans via Command Prompt",
        steps: [
          "Open the Start menu, type 'cmd', right-click Command Prompt and select 'Run as administrator'.",
          "Type 'sfc /scannow' and press Enter. Wait for the System File Checker to scan and repair corrupted core system files.",
          "Once the SFC scan is complete, type 'DISM /Online /Cleanup-Image /RestoreHealth' and press Enter.",
          "Allow the Deployment Image Servicing and Management tool to repair the underlying Windows image.",
          "Restart your computer after both commands have finished executing."
        ]
      },
      {
        title: "Perform a Clean Boot to Isolate Third-Party Conflicts",
        steps: [
          "Press Windows Key + R, type 'msconfig', and press Enter to open System Configuration.",
          "Navigate to the 'Services' tab, check the box that says 'Hide all Microsoft services', and then click 'Disable all'.",
          "Switch to the 'Startup' tab and click 'Open Task Manager'.",
          "In Task Manager, right-click each startup item and select 'Disable'.",
          "Close Task Manager, click OK on the System Configuration window, and restart your PC to see if a third-party app is causing the crash."
        ]
      },
      {
        title: "Check Disk for Bad Sectors and Corruption",
        steps: [
          "Open Command Prompt as Administrator.",
          "Type 'chkdsk C: /f /r /x' and press Enter. (Replace C: with your system drive letter if different).",
          "You will be prompted to schedule the scan for the next restart. Type 'Y' and press Enter.",
          "Reboot your computer. Windows will perform a thorough disk check before booting, repairing bad sectors.",
          "This process may take several hours depending on the size and speed of your drive."
        ]
      }
    ],
    faq: [
      {
        question: "Can a failing hard drive cause CRITICAL_PROCESS_DIED?",
        answer: "Yes, if the physical storage drive containing your Windows installation is failing, system processes may fail to read vital data, causing them to crash and trigger this BSOD."
      },
      {
        question: "What if the PC won't boot into Windows at all?",
        answer: "You will need to boot into the Windows Recovery Environment (WinRE) by interrupting the boot process three times, or by using a Windows installation USB, and then run Command Prompt from the Advanced Options menu."
      },
      {
        question: "Does reinstalling Windows fix this issue?",
        answer: "If the issue is caused by software corruption or malware, a clean installation of Windows will permanently fix it. However, if the cause is failing hardware (like a dying SSD or RAM), the error will return even after a reinstall."
      }
    ]
  },
  {
    code: "0x80070422",
    title: "How to Fix Windows Update Error 0x80070422 (Service Disabled)",
    summary: "Resolve the 0x80070422 Windows Update error by re-enabling critical update services, configuring network list services, and repairing the registry.",
    overview: "Error 0x80070422 is a common Windows Update and Microsoft Store error that indicates a critical background service required for the operation is disabled or unable to start. The Windows Update ecosystem relies on a network of interdependent services to function correctly, primarily the Windows Update service (wuauserv), the Background Intelligent Transfer Service (BITS), and the Network List Service. If a user, a third-party 'optimization' tool, or malware disables these services, Windows cannot download or install patches, resulting in the 0x80070422 exception. This error is particularly prevalent among users who run aggressive debloat scripts or privacy tools that disable telemetry and update services to prevent forced restarts. To resolve this issue, you must dive into the Windows Services management console and ensure that the core update services are set to run automatically. Additionally, ensuring that your network profiles are correctly identified is crucial, as Windows Update requires an active, metered-status-aware connection to proceed.",
    detailedFixes: [
      {
        title: "Enable the Windows Update Service",
        steps: [
          "Press Windows Key + R, type 'services.msc', and press Enter.",
          "Scroll down the list and locate 'Windows Update'.",
          "Double-click it to open its properties. Change the 'Startup type' from 'Disabled' to 'Automatic'.",
          "Click the 'Start' button under Service status to run the service immediately.",
          "Click 'Apply' and 'OK', then attempt to run Windows Update again."
        ]
      },
      {
        title: "Enable Network List Service",
        steps: [
          "Open the Services console by typing 'services.msc' in the Run dialog.",
          "Locate 'Network List Service' and double-click it.",
          "Change its Startup type to 'Automatic' and click 'Start' if the service is stopped.",
          "Do the same for 'Network Location Awareness', as they work together.",
          "Apply the changes, close the window, and restart your computer."
        ]
      },
      {
        title: "Disable IPv6 Temporarily",
        steps: [
          "Press Windows Key + R, type 'ncpa.cpl', and press Enter to open Network Connections.",
          "Right-click your active network adapter (Wi-Fi or Ethernet) and select 'Properties'.",
          "Scroll down the list and uncheck 'Internet Protocol Version 6 (TCP/IPv6)'.",
          "Click 'OK' to save changes and restart your PC.",
          "Sometimes Windows Update servers struggle with certain IPv6 configurations; disabling it forces IPv4 routing."
        ]
      }
    ],
    faq: [
      {
        question: "Why was the Windows Update service disabled in the first place?",
        answer: "It is often disabled by third-party PC optimizers, privacy tools like O&O ShutUp10, or malware trying to prevent security patches from being installed."
      },
      {
        question: "Does error 0x80070422 affect the Microsoft Store?",
        answer: "Yes, the Microsoft Store relies on the exact same background services to download and update apps. Fixing this error will usually fix Store download issues simultaneously."
      },
      {
        question: "Can I just use a batch script to re-enable everything?",
        answer: "Yes, you can run commands like 'sc config wuauserv start= auto' and 'net start wuauserv' in an elevated Command Prompt to achieve the same result programmatically."
      }
    ]
  },
  {
    code: "0x80070057",
    title: "How to Fix Error 0x80070057 (Invalid Parameter / Storage Issue)",
    summary: "Fix the versatile 0x80070057 'Invalid Parameter' error encountered during Windows installation, backups, or updates by addressing storage and registry issues.",
    overview: "The error code 0x80070057 translates to E_INVALIDARG or 'The parameter is incorrect'. This is one of the most versatile and frustrating errors in Windows, as it can appear in a wide variety of contexts: during a clean Windows installation, while running Windows Backup, when updating the OS, or even when transferring files to an external drive. At its core, the error signifies that a Windows process received an argument or parameter that it did not expect or could not parse. For instance, during a Windows Backup, if the system reserved partition is too small or improperly formatted, the backup engine receives an invalid parameter when trying to write shadow copies, triggering the error. During an update, it might mean the registry key dictating the update path is corrupted. Resolving 0x80070057 heavily depends on the context in which it occurs, but standard solutions involve running Check Disk to repair file system parameters, altering registry entries for Windows Update, or adjusting partition sizes.",
    detailedFixes: [
      {
        title: "Modify the Registry for Windows Update",
        steps: [
          "Press Windows Key + R, type 'regedit', and press Enter to open the Registry Editor.",
          "Navigate to 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\WindowsUpdate\\UX'.",
          "Look for a DWORD value named 'IsConvergedUpdateStackEnabled'. If it exists, double-click it and set its value to 0.",
          "Next, navigate to 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\WindowsUpdate\\UX\\Settings'.",
          "Ensure 'UxOption' is set to 0. Restart your computer and try updating again."
        ]
      },
      {
        title: "Run Check Disk (CHKDSK) on the System Drive",
        steps: [
          "Open the Start menu, type 'cmd', right-click Command Prompt, and select 'Run as administrator'.",
          "Type 'chkdsk C: /f /r' and press Enter.",
          "If prompted to schedule the check on the next restart, type 'Y' and press Enter.",
          "Reboot your PC and allow the disk check to complete. This repairs invalid file system parameters that cause the error during file transfers or backups."
        ]
      },
      {
        title: "Rename the SoftwareDistribution Folder",
        steps: [
          "Open Command Prompt as Administrator.",
          "Type 'net stop wuauserv' and press Enter.",
          "Type 'net stop bits' and press Enter.",
          "Type 'ren C:\\Windows\\SoftwareDistribution SoftwareDistribution.old' and press Enter.",
          "Restart the services by typing 'net start wuauserv' and 'net start bits'. Reboot."
        ]
      }
    ],
    faq: [
      {
        question: "Why do I get 0x80070057 during a clean Windows installation?",
        answer: "This usually happens if the partition you are trying to install Windows on is corrupted or incorrectly formatted. Deleting all partitions and letting the Windows installer recreate them usually resolves this."
      },
      {
        question: "Can an SSD firmware issue cause this error?",
        answer: "Yes, outdated SSD firmware or a failing controller can return invalid parameters to the operating system during heavy read/write operations like backups."
      },
      {
        question: "Is it safe to modify the Windows registry?",
        answer: "Modifying the registry can be risky if you change the wrong keys. Always right-click and 'Export' the registry branch to create a backup before making any changes."
      }
    ]
  },
  {
    code: "0x80248007",
    title: "How to Fix Windows Update Error 0x80248007 (Missing Update Files)",
    summary: "Resolve the 0x80248007 error preventing Windows Updates from downloading or installing by resetting the SoftwareDistribution cache and Windows Installer.",
    overview: "Error 0x80248007 is a specific Windows Update client exception indicating that some files in the update payload are missing, or the Microsoft Software License Terms (EULA) cannot be located. This usually occurs when the Windows Update agent loses synchronization with the Microsoft update servers during a download, or when the local SoftwareDistribution folder becomes corrupted. When Windows attempts to assemble the downloaded packages for installation, it realizes pieces are missing and throws the 0x80248007 code. This issue is frequently seen on machines that have experienced sudden power loss during an update, unstable Wi-Fi connections, or when users pause and resume updates multiple times. Because the local cache believes it has downloaded the files (when it actually hasn't), it will stubbornly refuse to re-download them until the cache is manually cleared. Fixing this requires purging the Windows Update download cache and restarting the relevant cryptographic and update services to force a fresh synchronization.",
    detailedFixes: [
      {
        title: "Purge the Windows Update Cache",
        steps: [
          "Open Command Prompt as Administrator.",
          "Stop the Windows Update service by typing 'net stop wuauserv' and pressing Enter.",
          "Open File Explorer, navigate to 'C:\\Windows\\SoftwareDistribution\\DataStore', and delete all files inside.",
          "Navigate to 'C:\\Windows\\SoftwareDistribution\\Download' and delete all files inside.",
          "Return to Command Prompt and type 'net start wuauserv' to restart the service."
        ]
      },
      {
        title: "Ensure the Windows Installer Service is Running",
        steps: [
          "Press Windows Key + R, type 'services.msc', and press Enter.",
          "Scroll down and locate 'Windows Installer'.",
          "Double-click it, ensure the Startup type is not set to Disabled (Manual is fine).",
          "Click 'Start' to manually run the service for the current session.",
          "Click OK and attempt to run Windows Update again."
        ]
      },
      {
        title: "Run the Built-in Windows Update Troubleshooter",
        steps: [
          "Open the Windows Settings app (Windows Key + I).",
          "Go to 'Update & Security', then select 'Troubleshoot' on the left pane.",
          "Click on 'Additional troubleshooters'.",
          "Select 'Windows Update' and click 'Run the troubleshooter'.",
          "Allow the tool to automatically detect and fix registry and service inconsistencies."
        ]
      }
    ],
    faq: [
      {
        question: "Does error 0x80248007 mean my Windows license is invalid?",
        answer: "No, while the error description sometimes mentions missing license terms, it refers to the EULA of the specific update package, not your actual Windows OS activation license."
      },
      {
        question: "Will the Windows Update Troubleshooter actually fix anything?",
        answer: "Yes, the built-in troubleshooter is surprisingly effective for 0x80248007, as it automates the process of stopping services, clearing the cache, and restarting them."
      },
      {
        question: "Can I just manually download the update from the Microsoft Catalog?",
        answer: "Yes. If the automatic update keeps failing, you can search for the KB number on the Microsoft Update Catalog website and install the standalone .msu file manually."
      }
    ]
  },
  {
    code: "0x80070003",
    title: "How to Fix Error 0x80070003 (Path Not Found) on Windows",
    summary: "Fix the 0x80070003 'Path Not Found' error by resolving directory structural issues, correcting registry paths, and re-registering Windows Update components.",
    overview: "The error code 0x80070003 translates to ERROR_PATH_NOT_FOUND. Similar to the 'File Not Found' error, this indicates that Windows is trying to execute an operation in a directory path that does not exist. This error is extremely common during Windows OS upgrades (e.g., upgrading from Windows 10 to Windows 11), System Restores, or when attempting to download apps from the Microsoft Store. During a major OS upgrade, the setup process creates temporary installation folders (like $WINDOWS.~BT). If third-party antivirus software quarantines these folders, or if they are written to a drive that suddenly becomes disconnected or runs out of space, the setup engine loses the path and throws 0x80070003. When this error occurs in the Microsoft Store, it usually means the default installation path for apps (usually in C:\\Program Files\\WindowsApps) is corrupted or inaccessible. Resolving this error typically involves cleaning out temporary installation files, ensuring correct drive lettering, and resetting the Store cache.",
    detailedFixes: [
      {
        title: "Delete Temporary Update Folders",
        steps: [
          "Open File Explorer and navigate to your C: drive.",
          "Click the 'View' tab and ensure 'Hidden items' is checked.",
          "Look for folders named '$WINDOWS.~BT' and '$Windows.~WS'.",
          "Right-click these folders and delete them. (You may need administrator privileges).",
          "Restart your PC and attempt the Windows upgrade or update again."
        ]
      },
      {
        title: "Reset the Microsoft Store Cache",
        steps: [
          "Press Windows Key + R to open the Run dialog box.",
          "Type 'wsreset.exe' and press Enter.",
          "A blank Command Prompt window will open. Do not close it.",
          "Wait for about 10-30 seconds. The window will automatically close, and the Microsoft Store will launch.",
          "This flushes the Store cache and resolves path-related errors for app downloads."
        ]
      },
      {
        title: "Change the Default Save Location for Apps",
        steps: [
          "Open the Windows Settings app (Windows Key + I).",
          "Go to 'System' > 'Storage'.",
          "Scroll down and click on 'Change where new content is saved' (or 'Advanced storage settings' in Win 11).",
          "Ensure that 'New apps will save to:' is set to your primary C: drive.",
          "If it is already set to C:, change it to another drive, apply it, and then change it back to C: to reset the registry path."
        ]
      }
    ],
    faq: [
      {
        question: "Can running out of disk space cause error 0x80070003?",
        answer: "Yes, if a drive runs out of space while Windows is creating an installation path, the folder creation will fail silently, leading to a 'Path Not Found' error when the installer tries to access it."
      },
      {
        question: "What is the $WINDOWS.~BT folder?",
        answer: "It is a hidden temporary folder created by Windows Update containing the installation files and logs for major feature updates and OS upgrades."
      },
      {
        question: "Will deleting $WINDOWS.~BT break my current installation?",
        answer: "No, deleting it is completely safe. However, it will remove the files necessary to roll back to a previous version of Windows if you have recently upgraded."
      }
    ]
  },
  {
    code: "PAGE_FAULT_IN_NONPAGED_AREA",
    title: "How to Fix PAGE_FAULT_IN_NONPAGED_AREA Blue Screen (BSOD)",
    summary: "Resolve the PAGE_FAULT_IN_NONPAGED_AREA fatal error by testing RAM, disabling fast startup, and fixing paging file configurations in Windows.",
    overview: "The PAGE_FAULT_IN_NONPAGED_AREA bug check is a very common Blue Screen of Death (BSOD) that points directly to a memory management issue within Windows. The operating system utilizes a 'paging file' on your hard drive to act as virtual memory, swapping data in and out of physical RAM as needed. However, certain critical core system data must remain in the 'non-paged area' of RAM—meaning it can never be swapped to the slower hard drive. If a driver, system service, or faulty hardware attempts to access data in this non-paged area and cannot find it, the system panics and triggers this BSOD. The most frequent culprits are defective physical RAM sticks (memory modules), corrupted hard drive sectors housing the paging file, or incompatible low-level software like aggressive antivirus suites and virtual drive emulators. Fixing this requires testing your hardware using the Windows Memory Diagnostic tool, managing your virtual memory settings, or disabling features like Fast Startup that heavily rely on RAM caching.",
    detailedFixes: [
      {
        title: "Run the Windows Memory Diagnostic Tool",
        steps: [
          "Press Windows Key + R, type 'mdsched.exe', and press Enter.",
          "Select 'Restart now and check for problems (recommended)'.",
          "Your PC will restart into a blue diagnostic screen and begin testing your RAM modules for physical defects.",
          "Allow the test to complete (it may take 15-30 minutes).",
          "Once Windows boots back up, check the Event Viewer (System logs) for the MemoryDiagnostics-Results to see if your RAM needs replacing."
        ]
      },
      {
        title: "Disable Fast Startup",
        steps: [
          "Open the Control Panel and view by 'Large icons'.",
          "Click on 'Power Options', then select 'Choose what the power buttons do' on the left pane.",
          "Click 'Change settings that are currently unavailable' (requires administrator rights).",
          "Under Shutdown settings, uncheck the box for 'Turn on fast startup (recommended)'.",
          "Click 'Save changes' and restart your computer. Fast startup can sometimes load a corrupted memory state, triggering the BSOD."
        ]
      },
      {
        title: "Reset Virtual Memory (Paging File) Settings",
        steps: [
          "Press Windows Key + R, type 'sysdm.cpl', and press Enter to open System Properties.",
          "Go to the 'Advanced' tab and click 'Settings' under the Performance section.",
          "Navigate to the 'Advanced' tab in Performance Options and click 'Change' under Virtual memory.",
          "Check the box 'Automatically manage paging file size for all drives'.",
          "If it is already checked, uncheck it, select 'No paging file' for your C: drive, restart, and then re-enable 'System managed size'."
        ]
      }
    ],
    faq: [
      {
        question: "Does this BSOD mean I need to buy new RAM?",
        answer: "If the Windows Memory Diagnostic tool or MemTest86 finds hardware errors, then yes, replacing the faulty RAM stick is the only permanent solution. However, software drivers often cause this too."
      },
      {
        question: "Can an SSD cause PAGE_FAULT_IN_NONPAGED_AREA?",
        answer: "Yes, because the paging file resides on your storage drive, a failing SSD or HDD with corrupted sectors can fail to retrieve memory pages, simulating a RAM failure."
      },
      {
        question: "What is Fast Startup and why disable it?",
        answer: "Fast Startup combines a traditional shutdown with hibernation. It saves the kernel state to the hard drive to boot faster. If this saved state is corrupted, it causes memory errors upon boot."
      }
    ]
  }
];
