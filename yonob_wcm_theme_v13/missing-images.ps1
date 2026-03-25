$base = "c:\xampp\htdocs\drupal\web\themes\custom\yonob_wcm_theme\images"

@("header", "footer") | ForEach-Object {
    New-Item -ItemType Directory -Force -Path "$base\$_" | Out-Null
}

$svgs = @{

    "header\WCAG-yono-logo.svg"   = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 38" width="140" height="38">
  <rect width="140" height="38" fill="#000" />
  <text x="70" y="24" fill="#0f0" font-family="Arial" font-weight="bold" font-size="20" text-anchor="middle">YONO BIZ</text>
</svg>
'@

    "header\arrow-down-black.svg" = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12">
  <path d="M6 9l6 6 6-6" fill="none" stroke="#242424" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
'@

    "footer\app-store.png"        = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40" width="120" height="40">
  <rect width="120" height="40" rx="6" fill="#000" stroke="#a6a6a6" stroke-width="1"/>
  <text x="60" y="25" fill="#fff" font-family="Arial" font-size="14" text-anchor="middle">App Store</text>
</svg>
'@

    "footer\play-store.png"       = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40" width="120" height="40">
  <rect width="120" height="40" rx="6" fill="#000" stroke="#a6a6a6" stroke-width="1"/>
  <text x="60" y="25" fill="#fff" font-family="Arial" font-size="13" text-anchor="middle">Google Play</text>
</svg>
'@

    "footer\phone-call.png"       = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
  <circle cx="12" cy="12" r="11" fill="none" stroke="#ccced2" stroke-width="2"/>
  <path d="M7 10c1 3 4 6 7 7 1 .3 2-.7 2-1 0-.5-.5-1-1-1-1 0-2-1-3-2-1-1-2-2-2-3 0-.5-.5-1-1-1-.3 0-1.3 1-1 2z" fill="#ccced2"/>
</svg>
'@

    "footer\floating-QR.png"      = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect width="100" height="100" fill="#fff" rx="4"/>
  <rect x="15" y="15" width="20" height="20" fill="none" stroke="#242424" stroke-width="3"/>
  <rect x="65" y="15" width="20" height="20" fill="none" stroke="#242424" stroke-width="3"/>
  <rect x="15" y="65" width="20" height="20" fill="none" stroke="#242424" stroke-width="3"/>
  <rect x="45" y="45" width="10" height="10" fill="#242424"/>
  <rect x="45" y="20" width="10" height="10" fill="#242424"/>
  <rect x="20" y="45" width="10" height="10" fill="#242424"/>
  <rect x="70" y="65" width="15" height="15" fill="#242424"/>
</svg>
'@
}

foreach ($key in $svgs.Keys) {
    $outPath = "$base\$key"
    $dir = Split-Path $outPath -Parent
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
    $svgs[$key].Trim() | Set-Content -Path $outPath -Encoding UTF8
    Write-Host "CREATED: $key"
}
