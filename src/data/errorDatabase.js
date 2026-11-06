export const ERROR_CATEGORIES = ['Windows BSOD', 'Windows Update', 'Node.js', 'Bloatware'];

const entries = [
  {
    code: '0x0000007B',
    title: 'INACCESSIBLE_BOOT_DEVICE',
    category: 'Windows BSOD',
    summary: 'Windows cannot read from the boot volume, so startup stops before the desktop loads.',
    technicalCause:
      'Usually caused by a storage driver that no longer matches the BIOS/UEFI SATA mode, a corrupted boot configuration, or a failing disk. It can also appear after moving a disk between machines or changing from IDE/AHCI/RAID.',
    diagnosticSteps: [
      'Disconnect recently attached USB drives and external storage, then restart.',
      'Enter BIOS/UEFI and confirm the SATA/NVMe controller mode (AHCI, RAID, or IDE) has not changed.',
      'Boot into Safe Mode or Windows Recovery Environment and check whether the disk is visible in Disk Management or diskpart.',
      'Run chkdsk /f and bootrec /scanos from the recovery environment if the volume is readable.',
      'Check Event Viewer or storage health tools for disk errors and SMART warnings.',
    ],
    detailedFixes: [
      {
        title: 'Restore the storage controller mode',
        description:
          'Set the BIOS/UEFI SATA/NVMe mode back to what the OS driver expects, then reinstall the storage driver if needed.',
        steps: [
          'Reboot and enter BIOS/UEFI (F2, Del, or manufacturer key).',
          'Navigate to SATA, NVMe, or Storage Configuration.',
          'Set the mode to AHCI (or keep RAID if the original install used it).',
          'Save changes and exit, then boot into Windows.',
          'If the OS still fails, boot from a Windows installation USB, open the recovery command prompt, and run bootrec /fixmbr /fixboot /rebuildbcd.',
        ],
      },
      {
        title: 'Repair the boot configuration',
        description:
          'Rebuild the BCD store and restore a missing or corrupted boot entry.',
        steps: [
          'Boot from a Windows installation USB and select "Repair your computer".',
          'Open Command Prompt and run: bootrec /scanos, then bootrec /osdiscovery.',
          'If a Windows installation is found, run bootrec /rebuildbcd.',
          'Restart the computer and verify normal boot.',
        ],
      },
      {
        title: 'Load the correct storage driver in recovery',
        description:
          'Manually load the appropriate storage driver when the OS cannot detect the boot drive.',
        steps: [
          'At the recovery environment command prompt, run diskpart, then list volume to identify the system drive letter.',
          'Run exit to exit diskpart, then run bootrec /rebuildbcd.',
          'If the driver is a .inf file on a USB stick, use "driverquery /FO LIST | findstr /I storage" to locate the driver name, then load it with "loadinf <path>.inf".',
        ],
      },
      {
        title: 'Run disk checks and replace failing hardware',
        description:
          'If the disk has bad sectors or SMART warnings, the boot volume may become inaccessible.',
        steps: [
          'In the recovery environment, run chkdsk /f /r <drive letter>: to check and repair file‑system errors.',
          'Run wmic diskdrive get status, statusformat to view SMART data.',
          'If SMART reports "Caution" or "Pred Fail", back up data immediately and replace the drive.',
          'After replacing the drive, perform a clean install of Windows.',
        ],
      },
    ],
  },
  {
    code: '0x000000EF',
    title: 'CRITICAL_PROCESS_DIED',
    category: 'Windows BSOD',
    summary:
      'A critical Windows process terminated unexpectedly, forcing a bugcheck that halts the system.',
    technicalCause:
      'Corrupted system files, failing hardware (RAM, disk), incompatible or buggy drivers, malware infection, or a recent Windows update that replaced a critical process binary.',
    diagnosticSteps: [
      'Open the Reliability Monitor (run reliability.msc) to identify the process and time of the crash.',
      'Check the Event Viewer (Windows Logs > System) for the bugcheck event source and the participating process name.',
      'Run the System File Checker: sfc /scannow from an elevated command prompt.',
      'Run DISM: DISM /Online /Cleanup-Image /RestoreHealth to repair the component store.',
      'Use Windows Memory Diagnostic (mdsched.exe) to test RAM for errors.',
      'If a new driver or update was installed just before the crashes began, consider rolling it back.',
    ],
    detailedFixes: [
      {
        title: 'Repair system files and the component store',
        description:
          'Replace corrupted OS binaries and restore a healthy component store.',
        steps: [
          'Open an elevated (Run as administrator) command prompt and run sfc /scannow.',
          'If SFC reports it could not fix some files, run DISM /Online /Cleanup-Image /RestoreHealth.',
          'Restart the computer and verify whether the bugcheck persists.',
        ],
      },
      {
        title: 'Roll back a recent driver or update',
        description:
          'If a new driver or cumulative update triggered the crashes, revert to the previous version.',
        steps: [
          'Open Device Manager, find the device most recently updated (right‑click > Properties > Driver > Driver Details).',
          'Right‑click the device > Update Driver > Browse my computer for drivers > Select "Search automatically for updated driver software" to view available prior versions.',
          'Alternatively, use "wmic qfe list brief" to list installed hotfixes and uninstall the suspect one via Settings > Update & Security > View update history > Uninstall updates.',
          'Restart and monitor for recurrence.',
        ],
      },
      {
        title: 'Test RAM and storage health',
        description:
          'Faulty RAM or a failing disk can corrupt process memory and trigger the bugcheck.',
        steps: [
          'Run Windows Memory Diagnostic (mdsched.exe) and choose "Restart now and check for problems".',
          'If RAM errors are found, replace the module(s) and test again.',
          'Run chkdsk /f /r on each volume from an elevated prompt to surface disk surface issues.',
          'Use a third‑party tool such as MemTest86 for a thorough memory test outside Windows.',
        ],
      },
    ],
  },
  {
    code: '0x00000050',
    title: 'PAGE_FAULT_IN_NONPAGED_AREA',
    category: 'Windows BSOD',
    summary:
      'The system tried to access memory that was marked as non‑paged but was not present.',
    technicalCause:
      'Faulty RAM, a buggy driver (often network, storage, or antivirus filter driver), corrupted NTFS volume, or mis‑aligned system service. Overclocking can also trigger this bugcheck.',
    diagnosticSteps: [
      'Run Windows Memory Diagnostic (mdsched.exe) to test RAM modules.',
      'Check the Event Viewer for the specific driver name involved in the crash.',
      'Use Driver Verifier to stress‑test drivers and surface the offending module.',
      'Run chkdsk /f /r on the system volume to rule out file‑system corruption.',
      'Note any recent software or hardware changes before the first occurrence.',
    ],
    detailedFixes: [
      {
        title: 'Test and replace faulty RAM',
        description:
          'If the memory test reports errors, replace the affected module(s).',
        steps: [
          'Run Windows Memory Diagnostic or MemTest86.',
          'If errors appear, power down the system, reseat or replace the RAM module.',
          'Run chkdsk /f /r after RAM replacement to verify stability.',
        ],
      },
      {
        title: 'Update or roll back the offending driver',
        description:
          'A driver that improperly accesses non‑paged memory often causes this crash.',
        steps: [
          'In Device Manager, look for devices with a yellow warning triangle that correspond to the driver name from the Event Viewer dump.',
          'Right‑click the device > Update Driver > Search automatically for updated driver software.',
          'If a recent update correlates with the crashes, right‑click > Properties > Driver > Roll Back Driver.',
          'After the change, restart and monitor for recurrence.',
        ],
      },
      {
        title: 'Fix file‑system corruption',
        description:
          'NTFS corruption can cause phantom memory references that look like page faults.',
        steps: [
          'Open an elevated command prompt and run chkdsk /f /r C: (or the system volume letter).',
          'Allow the scan to complete; it may take an hour or more.',
          'If corruption is severe, back up data, reformat, and perform a clean Windows installation.',
        ],
      },
    ],
  },
  {
    code: '0x000000D1',
    title: 'DRIVER_IRQL_NOT_LESS_OR_EQUAL',
    category: 'Windows BSOD',
    summary:
      'A driver attempted to access pageable memory at an interrupt request level (IRQL) that was too high.',
    technicalCause:
      'Typically a network, storage, or graphics driver that dereferences an invalid pointer at high IRQL. Can also be caused by over‑aggressive antivirus filter drivers, faulty RAM, or a bad overclock.',
    diagnosticSteps: [
      'Record the driver name from the bugcheck parameters or Event Viewer details.',
      'Safe‑boot the system and observe whether the crash still occurs.',
      'Run Driver Verifier with the suspect driver added to force early failure and capture the dump.',
      'Check Windows Reliability History for patterns (e.g., only when a specific application runs).',
      'Monitor RAM with Windows Memory Diagnostic if the crash is intermittent.',
    ],
    detailedFixes: [
      {
        title: 'Update or roll back the suspect driver',
        description:
          'The simplest fix when a single driver is identified.',
        steps: [
          'In Device Manager, right‑click the suspect driver > Update Driver > Search automatically for updated driver software.',
          'If the crash started after a recent update, right‑click > Properties > Driver > Roll Back Driver.',
          'If no driver update is available, disable the device temporarily to see if the system stabilizes.',
          'Restart and verify the crash is gone.',
        ],
      },
      {
        title: 'Disable incompatible antivirus or filter drivers',
        description:
          'Some endpoint security products install filter drivers that interfere with IRQL handling.',
        steps: [
          'Open the antivirus console and disable real‑time scanning temporarily.',
          'If the crash stops, add an exception for the system files or temporarily uninstall the product.',
          'Re‑enable the product and check for an update that addresses the incompatibility.',
        ],
      },
      {
        title: 'Test hardware and overclocking stability',
        description:
          'Excess voltage or unstable CPU/GPU settings can raise IRQL beyond safe limits.',
        steps: [
          'Reset BIOS/UEFI to defaults (Load Optimized Defaults).',
          'If overclocking the CPU or GPU, reduce the frequency or voltage and test stability with Prime95 or FurMark.',
          'Run Windows Memory Diagnostic after any hardware change.',
          'Restart and confirm the crash no longer appears.',
        ],
      },
    ],
  },
  {
    code: '0x80070005',
    title: '0x80070005 (Access denied)',
    category: 'Windows Update',
    summary:
      'Windows cannot complete the operation because the user or security context lacks the required permissions.',
    technicalCause:
      'Often triggered by insufficient user rights, Group Policy restrictions, System Reserved partition protection, third‑party security software, or a corrupted Windows Update cache.',
    diagnosticSteps: [
      'Run the built‑in Windows Update troubleshooter (Settings > System > Troubleshoot > Other troubleshooters).',
      'Check that the account has Administrator privileges.',
      'Review Group Policy (gpedit.msc) under Computer Configuration > Administrative Templates > Windows Components > Windows Update for any deny rules.',
      'Temporarily disable real‑time protection in Windows Security or third‑party AV.',
      'Verify that the SoftwareDistribution and Catroot2 folders are not corrupted.',
    ],
    detailedFixes: [
      {
        title: 'Reset Windows Update components',
        description:
          'Renaming the update caches forces Windows to recreate them with correct permissions.',
        steps: [
          'Open an elevated command prompt and run the following commands one after another:',
          'net stop wuauserv',
          'net stop bits',
          'net stop cryptSvc',
          'ren C:\\Windows\\SoftwareDistribution SoftwareDistribution.old',
          'ren C:\\Windows\\System32\\catroot2 catroot2.old',
          'net start wuauserv',
          'net start bits',
          'net start cryptSvc',
          'Restart the computer and retry the update.',
        ],
      },
      {
        title: 'Check and adjust security software settings',
        description:
          'Antivirus or endpoint protection may block update processes.',
        steps: [
          'Temporarily disable real‑time scanning in Windows Security or the third‑party product.',
          'Add the following paths to the exclusion list: C:\\Windows\\SoftwareDistribution, C:\\Windows\\System32\\catroot2, C:\\Windows\\System32\\wuapp.exe.',
          'If using a corporate AV, consult the administrator to allow Windows Update traffic.',
          'Re‑enable protection and retry the update.',
        ],
      },
      {
        title: 'Repair system file integrity',
        description:
          'Corrupted system files can enforce permission blocks on update operations.',
        steps: [
          'Run sfc /scannow from an elevated prompt.',
          'If SFC cannot fix all files, follow with DISM /Online /Cleanup-Image /RestoreHealth.',
          'Restart and attempt the update again.',
        ],
      },
    ],
  },
  {
    code: '0x800F0922',
    title: '0x800F0922 (Feature update installation failed)',
    category: 'Windows Update',
    summary:
      'The feature update could not be installed, often due to insufficient system reserved space, conflicting .NET components, or VPN/antivirus interference.',
    technicalCause:
      'Insufficient unallocated space on the system reserved partition, a conflicting .NET Framework version, active VPN or proxy, or third‑party security software blocking the update payload.',
    diagnosticSteps: [
      'Check the Disk Management console for the size of the System Reserved (or System) partition; it should have at least 5–10 GB free.',
      'Run the Windows Update Health Check tool to list specific failure reasons from CBS logs.',
      'Note any active VPN, proxy, or third‑party security software that may be intercepting the update stream.',
      'Check the CBS log at C:\\Windows\\Logs\\CBS\\CBS.log for error 0x800F0922 entries and associated lines.',
    ],
    detailedFixes: [
      {
        title: 'Free space on the system reserved partition',
        description:
          'Ensure the partition has enough room for the update payload and backup.',
        steps: [
          'Open Disk Management (diskmgmt.msc) and inspect the System Reserved or System partition size.',
          'If space is critically low, shrink a data volume or delete non‑essential files to free at least 5 GB.',
          'After freeing space, retry the feature update.',
        ],
      },
      {
        title: 'Disable VPN, proxy, and security software temporarily',
        description:
          'These can intercept or block the update payload before it reaches the component store.',
        steps: [
          'Disconnect any active VPN connections.',
          'Disable proxy settings in Internet Options > Connections > LAN settings.',
          'Temporarily disable Windows Security real‑time protection and any third‑party antivirus.',
          'Retry the feature update.',
          'If the update succeeds, re‑enable the services one by one to identify the culprit.',
        ],
      },
      {
        title: 'Repair the component store and .NET Framework',
        description:
          'A corrupted component store or mismatched .NET version can cause the failure.',
        steps: [
          'Run DISM /Online /Cleanup-Image /RestoreHealth from an elevated prompt.',
          'If the feature update still fails, run the .NET Framework Repair Tool or reinstall the affected .NET version.',
          'After repair, restart and attempt the feature update again.',
        ],
      },
    ],
  },
  {
    code: '0x80070422',
    title: '0x80070422 (Windows Update service disabled)',
    category: 'Windows Update',
    summary:
      'The Windows Update service (wuauserv) or the Background Intelligent Transfer Service (bits) is disabled or not running.',
    technicalCause:
      'Often the result of a system tweak, Group Policy setting, registry edit, or third‑party optimization tool that disables these services to free resources.',
    diagnosticSteps: [
      'Open services.msc and confirm the startup type of "Windows Update" and "Background Intelligent Transfer Service" is set to Manual or Automatic.',
      'Check that both services are currently Running.',
      'Look for third‑party "PC cleaner" or "performance" tools that may have disabled them.',
      'Verify Group Policy (gpedit.msc) does not set these services to Disabled.',
    ],
    detailedFixes: [
      {
        title: 'Enable the Windows Update and BITS services',
        description:
          'Set both services back to their default startup type and start them.',
        steps: [
          'Open the Run dialog (Win+R), type services.msc, and press Enter.',
          'Locate "Windows Update" and "Background Intelligent Transfer Service".',
          - For each service, set the Startup type to "Manual" or "Automatic".',
          'Right‑click each service and select "Start" if it is stopped.',
          'Close the Services console and retry the update.',
        ],
      },
      {
        title: 'Check Group Policy restrictions',
        description:
          'If the environment uses Group Policy, the services may be forcibly disabled.',
        steps: [
          'Open gpedit.msc (requires Pro/Enterprise).',
          'Navigate to Computer Configuration > Administrative Templates > System > Internet Communication Management > Internet Communication Edge > "Turn off Windows Update".',
          'Ensure this policy is set to "Not Configured" or "Enabled" with the update service allowed.',
          'If the policy is Enabled, disable it, close the editor, and restart the services.',
        ],
      },
      {
        title: 'Repair the service registry and cache',
        description:
          'A corrupted service registry entry can prevent the service from starting.',
        steps: [
          'Open an elevated command prompt and run the following commands:',
          'sc config wuauserv start= auto',
          'sc config bits start= auto',
          'net stop wuauserv && net start wuauserv',
          'net stop bits && net start bits',
          'Restart the computer and retry the update.',
        ],
      },
    ],
  },
  {
    code: '0x8007000E',
    title: '0x8007000E (Not enough resources)',
    category: 'Windows Update',
    summary:
      'The update cannot be installed because the system reports insufficient memory or disk resources.',
    technicalCause:
      'Too many applications running, insufficient RAM, a nearly full system drive, or a page file that is too small to accommodate the update payload.',
    diagnosticSteps: [
      'Close all unnecessary applications and background processes.',
      'Check Task Manager > Performance for available RAM and available disk space.',
      'Run chkdsk /f on the system drive to rule out file‑system errors that may report false resource shortages.',
      'Examine the page file settings (System > Advanced > Performance > Settings > Advanced > Virtual memory) and verify it is set to system managed size.',
      'Review the CBS log at C:\\Windows\\Logs\\CBS\\CBS.log for specific resource‑related messages.',
    ],
    detailedFixes: [
      {
        title: 'Free memory and disk space',
        description:
          'Close apps, delete unneeded files, and ensure the page file is adequate.',
        steps: [
          'In Task Manager, sort by CPU or Memory and quit processes that are not essential.',
          'Use Storage Sense (Settings > System > Storage) to automatically free temporary files, recycle‑bin items, and old downloads.',
          'If the system drive is > 90 % full, move personal files to a secondary drive or external storage.',
          'After freeing resources, increase the page file size manually if desired, then retry the update.',
        ],
      },
      {
        title: 'Adjust the page file manually',
        description:
          'A custom page file sized just above the current RAM can resolve the shortage.',
        steps: [
          'Right‑click This PC > Properties > Advanced system settings > Performance > Advanced > Virtual memory > Change.',
          'Clear the "Automatically manage paging file size for all drives" checkbox.',
          'Select the system drive, choose "Custom size", set Initial size to the current RAM value, and set Maximum size to 1.5× the RAM (or as recommended by Microsoft for your configuration).',
          'Click Set, then OK and restart the computer.',
          'Attempt the update after the reboot.',
        ],
      },
    ],
  },
  {
    code: 'ERR_MODULE_NOT_FOUND',
    title: 'ERR_MODULE_NOT_FOUND',
    category: 'Node.js',
    summary:
      'Node.js cannot resolve the requested module at runtime, typically because the file path is wrong, the extension is missing, the package is not installed, or the module uses ESM/CJS exports that are not visible.',
    technicalCause:
      'Missing dependency in package.json, incorrect relative path (no .js extension in import), case‑sensitivity on case‑sensitive file systems, missing exports field in package.json "type": "module", or a dynamic import that fails at runtime.',
    diagnosticSteps: [
      'Read the full stack trace to identify the exact module path that failed.',
      'Verify the file exists at the reported location.',
      'Check that the file has a .js (or appropriate) extension in the import statement.',
      'Run npm install to ensure all listed dependencies are present.',
      'If using ESM (package.json "type": "module"), ensure the import uses the "import … from …" syntax and not require().',
      'Check the package's exports field in package.json for the correct entry point.',
    ],
    detailedFixes: [
      {
        title: 'Install the missing dependency',
        description:
          'If the module is a third‑party package, install it via npm or yarn.',
        steps: [
          'Run npm install <module‑name> (or yarn add <module‑name>).',
          'If the module is local, ensure its path is correct relative to the importing file.',
          'Restart the development server or Node process.',
        ],
      },
      {
        title: 'Fix the import path and extension',
        description:
          'Add the missing .js extension or correct the relative path.',
        steps: [
          'Change `import X from "./utils"` to `import X from "./utils.js"` (or the actual filename).',
          'If the file lives in a sibling directory, adjust the ../ count accordingly.',
          'Verify the import works by running the application again.',
        ],
      },
      {
        title: 'Align ESM and CJS usage',
        description:
          'Ensure the project\'s module system matches the imported module\'s expectations.',
        steps: [
          'Check package.json for the "type" field; if "module" is set, avoid require() for that import.',
          'If the package only provides CJS, either set "type": "commonjs" temporarily or use dynamic import(() => import(...)) to load it.',
          'Consult the package documentation for the recommended import style.',
        ],
      },
    ],
  },
  {
    code: 'ERR_REQUIRE_ESM',
    title: 'ERR_REQUIRE_ESM',
    category: 'Node.js',
    summary:
      'Node.js encountered require() of a module that is marked as ESM‑only (has "type": "module" in its package.json).',
    technicalCause:
      'The project or a dependency uses ESM exclusively, and a require() call was used to import it. This commonly happens when mixing CommonJS and ES module syntax in the same bundle, or when a developer copies an ESM‑only package\'s code and uses the old require pattern.',
    diagnosticSteps: [
      'Locate the require() call in the stack trace and note the module path.',
      'Check the target module\'s package.json for the "type": "module" field.',
      'Verify the Node.js version supports the module system (Node 12+ for ESM).',
      'Search the project for other imports of the same module to see the expected syntax.',
    ],
    detailedFixes: [
      {
        title: 'Convert the import to ES module syntax',
        description:
          'Replace require() with import() or a named import from the module.',
        steps: [
          'If the module exports a single function/object, use `import func from "<module>"`.',
          'If the module exports multiple items, use `import { func1, func2 } from "<module>"`.',
          'If the module is CommonJS‑only and must be used, use `const mod = require("<module>")` but be aware of potential incompatibilities.',
          'Run the application again to verify the change.',
        ],
      },
      {
        title: 'Use dynamic import with conditional loading',
        description:
          'Load the module only when needed, avoiding a top‑level require() conflict.',
        steps: [
          'Use `const mod = await import("<module>")` inside an async function.',
          'Combine with feature‑flag logic to load CJS or ESM based on the build target.',
        ],
      },
    ],
  },
  {
    code: 'EADDRINUSE',
    title: 'EADDRINUSE',
    category: 'Node.js',
    summary:
      'The application attempted to bind to a network port that is already in use by another process.',
    technicalCause:
      'Another instance of the app is already running, a lingering process from a previous crash, a development server (Vite, Webpack, etc.) still listening, or another service (database, SSH) occupying the port.',
    diagnosticSteps: [
      'Note the port number from the error message.',
      'On Windows, run `netstat -ano | findstr :<port>` to find the PID using the port.',
      'On macOS/Linux, run `lsof -i :<port>` or `ss -tlnp | grep <port>`.',
      'Identify the process and either kill it or decide whether it should remain running.',
    ],
    detailedFixes: [
      {
        title: 'Kill the conflicting process',
        description:
          'Terminate the process currently listening on the port.',
        steps: [
          'Windows: open Command Prompt as administrator, run `taskkill /PID <PID> /F`.',
          'macOS/Linux: run `kill -9 <PID>` or `pkill -f "<process‑name>"`.',
          'If the process is a development server, stop it (Ctrl+C in the terminal) and restart.',
        ],
      },
      {
        title: 'Change the port in the configuration',
        description:
          'If multiple services must run simultaneously, assign a different port.',
        steps: [
          'Open the application\'s configuration file (package.json scripts, vite.config.js, or .env).',
          'Modify the dev server port: in vite.config.js, set `server: { port: <new‑port> }`.',
          'Or set the PORT environment variable: `set PORT=<new‑port>` (Windows) or `export PORT=<new‑port>` (macOS/Linux).',
          'Restart the development or production server.',
        ],
      },
      {
        title: 'Check for Docker or WSL containers',
        description:
          'A container may be Exposing the same port host‑side.',
        steps: [
          'Run `docker ps` (or `docker container ls`) and inspect published ports.',
          'Use `docker network inspect <network>` to view port mappings.',
          'Either stop the container\'s port mapping or map the host port to a different external port.',
        ],
      },
    ],
  },
  {
    code: 'ERR_INVALID_ARG_TYPE',
    title: 'ERR_INVALID_ARG_TYPE',
    category: 'Node.js',
    summary:
      'A function received an argument of an incorrect type (e.g., null, undefined, number where string expected).',
    technicalCause:
      'Upstream code passes a value of the wrong type, a dependency mis‑configures its API, or a third‑party library does not validate its inputs before passing them to Node internals.',
    diagnosticSteps: [
      'Read the full stack trace; the failing function and the expected type are usually listed.',
      'Log the argument value and its type just before the call site (e.g., console.log(typeof arg, arg).',
      'Check the upstream data source (API response, user input, file read) for unexpected values.',
      'Review the documentation of the called function or library for the required argument types.',
    ],
    detailedFixes: [
      {
        title: 'Add runtime type validation',
        description:
          'Guard the call site to ensure the argument matches the expected type before passing it downstream.',
        steps: [
          'Wrap the call in a simple check: `if (typeof arg !== "expectedType") return;` or throw a descriptive error.',
          'Use a library such as `ajv` or `zod` for formal input validation if the function is part of a larger schema.',
          'After the guard is in place, run the application to confirm the error no longer appears.',
        ],
      },
      {
        title: 'Fix the upstream data source',
        description:
          'Correct the code that generates or supplies the argument so it always provides the expected type.',
        steps: [
          'If the argument comes from an API response, add a fallback default value when the field is missing or malformed.',
          'If it comes from user input, sanitize and coerce the value (e.g., `String(input)` or `Number(input)` with validation).',
          'After the fix, test the scenario that previously triggered the bugcheck.',
        ],
      },
    ],
  },
  {
    code: 'xtrabuttons.exe',
    title: 'Dell XtraButtons / Touchpad Utility',
    category: 'Bloatware',
    summary:
      'A touchpad hotkey utility often bundled with Dell laptops; can remain running after hardware features are managed by Windows.',
    technicalCause:
      'OEM utility auto‑starts at login; may duplicate gesture handling that Windows already provides. Not malware, but can consume resources and appear as bloatware.',
    diagnosticSteps: [
      'Open Task Manager and locate xtrabuttons.exe in the Processes tab.',
      'Check the Publisher column; it should display "Dell Inc.".',
      'Review Startup impact; if High, it runs at every login.',
      'Use Dell Command | Configure to see whether the touchpad hotkeys are managed by Windows or the utility.',
    ],
    detailedFixes: [
      {
        title: 'Disable the utility at startup',
        description:
          'Prevent xtrabuttons.exe from launching automatically without removing it entirely.',
        steps: [
          'Open Task Manager > Startup, right‑click xtrabuttons.exe, and select "Disable".',
          'Alternatively, use msconfig (Win+R, type msconfig) > Startup tab, uncheck the entry.',
          'Restart the computer; the utility will no longer run unless manually started.',
        ],
      },
      {
        title: 'Uninstall via Settings',
        description:
          'If the utility is not needed, remove it completely.',
        steps: [
          'Open Settings > Apps > Installed apps.',
          'Search for "XtraButtons" or "Dell Touchpad Utility".',
          'Click the three‑dot menu > Uninstall, then follow the prompts.',
          'After uninstallation, verify that touchpad basic gestures (scroll, pinch) still work in Windows.',
        ],
      },
    ],
  },
  {
    code: 'HPJumpStartBridge.exe',
    title: 'HP JumpStart Bridge',
    category: 'Bloatware',
    summary:
      'A HP onboarding and utility bridge that delivers initial setup prompts and occasional firmware checks.',
    technicalCause:
      'Bundled on HP consumer laptops; runs at login to present setup wizards and may check for driver updates. Not essential for core hardware functionality.',
    diagnosticSteps: [
      'Check Task Manager for HPJumpStartBridge.exe under Processes.',
      'Verify the Publisher shows "Hewlett‑Packard".',
      'Inspect the Startup impact; if High, it runs on every login.',
      'Use HP Support Assistant to see whether any of its features are required.',
    ],
    detailedFixes: [
      {
        title: 'Disable the bridge at startup',
        description:
          'Prevent it from running on login if the setup prompts are no longer needed.',
        steps: [
          'Open Task Manager > Startup, right‑click HPJumpStartBridge.exe, and select "Disable".',
          'Or use msconfig > Startup tab and uncheck the entry.',
          'Restart the computer.',
        ],
      },
      {
        title: 'Uninstall via Settings',
        description:
          'If the utility is not required, remove it completely.',
        steps: [
          'Open Settings > Apps > Installed apps.',
          'Search for "HP JumpStart" or "HPJumpStartBridge".',
          'Click the three‑dot menu > Uninstall and follow the prompts.',
          'Restart and confirm that core HP hardware (touchpad, keyboard) still functions.',
        ],
      },
    ],
  },
  {
    code: 'LenovoVantageService.exe',
    title: 'Lenovo Vantage Service',
    category: 'Bloatware',
    summary:
      'OEM management service that delivers firmware updates, driver enhancements, and hardware‑specific settings.',
    technicalCause:
      'Bundled on Lenovo consumer laptops; useful for keeping the system up‑to‑date but can be flagged as bloatware if the user does not use Lenovo\'s update or hardware‑tuning features.',
    diagnosticSteps: [
      'Open Task Manager and locate LenovoVantageService.exe.',
      'Verify the Publisher is "Lenovo".',
      'Check the Service description; it handles firmware and driver updates.',
      'If the service is set to Automatic and consumes notable CPU, consider changing its startup type.',
    ],
    detailedFixes: [
      {
        title: 'Change the service startup type',
        description:
          'Set the service to Manual so it only runs when explicitly invoked.',
        steps: [
          'Open the Run dialog (Win+R), type services.msc, and press Enter.',
          'Find "Lenovo Vantage Service" in the list.',
          - Right‑click > Properties > General > Startup type: change to "Manual".',
          'Click Stop if the service is currently running.',
          'Click OK and close the Services console.',
          'Restart the computer.',
        ],
      },
      {
        title: 'Uninstall Lenovo Vantage (if not needed)',
        description:
          'If you do not use Lenovo\'s update or hardware‑tuning tools, remove the application entirely.',
        steps: [
          'Open Settings > Apps > Installed apps.',
          'Search for "Lenovo Vantage".',
          'Click the three‑dot menu > Uninstall and follow the prompts.',
          'Restart and verify that core hardware (touchpad, keyboard, power management) still works.',
        ],
      },
    ],
  },
  {
    code: 'WildTangentGamesApp.exe',
    title: 'WildTangent Games App',
    category: 'Bloatware',
    summary:
      'A pre‑installed games portal and app store that many OEMs include; often runs in the background checking for game deals and achievements.',
    technicalCause:
      'Bundled on many consumer laptops as a revenue‑generating feature; not required for Windows operation and may consume CPU and network resources when checking for deals.',
    diagnosticSteps: [
      'Open Task Manager and look for WildTangentGamesApp.exe under Processes.',
      'Verify the Publisher shows "WildTangent, Inc.".',
      'Check the Startup impact; if High, it launches at every login.',
      'Use the Windows Settings > Apps > Installed apps page to view its installation source.',
    ],
    detailedFixes: [
      {
        title: 'Disable the app at startup',
        description:
          'Prevent it from launching automatically without a full uninstall.',
        steps: [
          'Open Task Manager > Startup, right‑click WildTangentGamesApp.exe, and select "Disable".',
          'Or use msconfig > Startup tab and uncheck the entry.',
          'Restart the computer.',
        ],
      },
      {
        title: 'Uninstall via Settings',
        description:
          'If the portal is not wanted, remove it completely.',
        steps: [
          'Open Settings > Apps > Installed apps.',
          'Search for "WildTangent" or "WildTangent Games".',
          'Click the three‑dot menu > Uninstall and confirm.',
          'Restart and verify that no essential Windows features are broken.',
        ],
      },
    ],
  },
];

export const errorDatabase = entries;

export function getErrorByCode(code) {
  const normalized = String(code ?? '').trim().toUpperCase();
  return entries.find(
    (entry) => String(entry.code ?? '').trim().toUpperCase() === normalized || String(entry.title ?? '').trim().toUpperCase() === normalized
  ) ?? null;
}

export function getErrorsByCategory(category) {
  const normalized = String(category ?? '').trim().toLowerCase();
  return entries.filter((entry) => entry.category.toLowerCase() === normalized);
}

export function searchErrors(query) {
  const term = String(query ?? '').trim().toLowerCase();
  if (!term) return entries;
  return entries.filter(
    (entry) =>
      [entry.code, entry.title, entry.category, entry.summary, entry.technicalCause]
        .join(' ')
        .toLowerCase()
        .includes(term)
  );
}