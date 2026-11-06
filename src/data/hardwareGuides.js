export const hardwareGuides = [
  {
    id: 'ram-upgrade',
    title: 'Upgrade RAM safely',
    summary:
      'Adding or replacing RAM is one of the most effective ways to improve system responsiveness and multitasking capacity.',
    difficulty: 'Beginner',
    time: '30–45 min',
    tools: ['Phillips #2 screwdriver', 'Anti‑static wrist strap (recommended)', 'Compatible RAM modules'],
    steps: [
      'Power down the computer and unplug the power cord.',
      'Open the case side panel (refer to the motherboard manual for latch locations).',
      'Locate the existing RAM slots; note the type (DDR4, DDR5) and speed.',
      'If adding a stick, match the existing module\'s speed and CAS latency for best compatibility.',
      'Press the clips on the sides of the slot outward; the module will pop up at a slight angle.',
      'Align the notch on the new module with the key in the slot, then press firmly until the clips snap back into place.',
      'Replace the side panel, plug in the power cord, and power on the computer.',
      'Verify the new RAM is recognized in Windows (Settings > System > About) or macOS (About This Mac).',
    ],
  },
  {
    id: 'nvme-ssd',
    title: 'Install an NVMe SSD',
    summary:
      'Adding a fast NVMe solid‑state drive dramatically reduces boot times and application load latency.',
    difficulty: 'Beginner',
    time: '20–30 min',
    tools: ['Phillips #0 screwdriver (sometimes)', 'Anti‑static wrist strap (recommended)'],
    steps: [
      'Shut down the computer, unplug the power cord, and ground yourself (touch a metal part of the case or wear a wrist strap).',
      'Open the case and locate the M.2 slot on the motherboard (often near the CPU or along the edge).',
      'Remove the screw securing the M.2 slot cover (if present).',
      'Insert the NVMe drive at a roughly 30‑degree angle, then press it flat until the keyed edge seats fully.',
      'Secure the drive with the screw removed in the previous step; do not overtighten.',
      'Replace the case panel, plug in the power cord, and boot the system.',
      'Initialize and format the new drive in Disk Management (Windows) or Disk Utility (macOS).',
    ],
  },
  {
    id: 'gpu-overheat',
    title: 'Address GPU overheating',
    summary:
      'Excessive GPU temperature can cause throttling, artifacting, or unexpected shutdowns during gaming or render workloads.',
    difficulty: 'Intermediate',
    time: '15–30 min',
    tools: ['Compressed air can', 'Isopropyl alcohol (90%+), lint‑free swabs', 'New thermal paste'],
    steps: [
      'Shut down the computer, unplug the power cord, and open the case.',
      'Remove the graphics card if it is externally mounted; otherwise, access the cooler from inside the case.',
      'Clean the GPU cooler and the top of the GPU die using compressed air and isopropyl alcohol; remove old thermal paste.',
      'Apply a pea‑sized amount of fresh thermal paste to the GPU die; spread evenly with a plastic spatula or the included applicator.',
      'Remount the cooler, ensuring even pressure and that all screws are tightened diagonally.',
      'Reinstall the graphics card, reconnect power cables, and close the case.',
      'Power on the system and monitor temperatures with HWInfo, GPU-Z, or AMD Adrenalin / NVIDIA Experience.',
    ],
  },
  {
    id: 'psu-check',
    title: 'Verify PSU wattage and health',
    summary:
      'An undersized or failing power supply can cause instability, random reboots, and component damage.',
    difficulty: 'Beginner',
    time: '10–20 min',
    tools: ['Paperclip (for paper‑clip test)', 'Multimeter (optional)', 'PSU calculator website'],
    steps: [
      'Check the label on the existing power supply for its maximum wattage and the amperage on the +12 V rail.',
      'Use an online PSU calculator (e.g., OuterVision, EVGA) to estimate the total system draw based on CPU, GPU, drives, and peripherals.',
      'If the calculated draw exceeds the PSU rating, replace the power supply with one that has at least 20–30 % headroom.',
      'Perform a minimal paper‑clip test: unplug the PSU, connect a paperclip between the green (PS_ON) and any black (GND) pin on the 24‑pin ATX connector, then plug the PSU back in and flip the switch; the fan should spin if the PSU is functional.',
      'For a more precise health check, use a multimeter to measure the +12 V and +5 V rails under no‑load conditions.',
      'Replace the PSU if the fan does not spin, voltages are out of spec, or the calculated system draw surpasses the rating.',
    ],
  },
];