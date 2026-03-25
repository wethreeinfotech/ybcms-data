$base = "c:\xampp\htdocs\drupal\web\themes\custom\yonob_wcm_theme\images"

# Ensure all subdirs exist
@("header", "footer", "carousel", "client-stories\carousel-banner", "knowledge-hub", "scroller") | ForEach-Object {
    New-Item -ItemType Directory -Force -Path "$base\$_" | Out-Null
}

# ── Simple SVG icons ────────────────────────────────────────────
$svgs = @{

    # Contrast toggle (half-circle icon)
    "header\contrast-icon.svg"                       = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M12 3a9 9 0 1 0 0 18A9 9 0 0 0 12 3zm0 16V5a7 7 0 0 1 0 14z" fill="#ccced2"/>
</svg>
'@

    # SBI hexagon/globe icon
    "header\sbi-icon.svg"                            = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <circle cx="12" cy="12" r="10" fill="none" stroke="#fff" stroke-width="2"/>
  <path d="M12 2a10 10 0 0 1 0 20A10 10 0 0 1 12 2z" fill="#514FA1" opacity=".4"/>
</svg>
'@

    # Arrow down (chevron for dropdowns)
    "header\arrow-down.svg"                          = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12">
  <path d="M6 9l6 6 6-6" fill="none" stroke="#ccced2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
'@

    # Arrow down white (footer)
    "footer\arrow-down-white.svg"                    = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12">
  <path d="M6 9l6 6 6-6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
'@

    # External link icon
    "header\external-link.svg"                       = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" fill="none" stroke="#ccced2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
'@

    # Customer support headset
    "header\customer-support.svg"                    = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
  <path d="M3 18v-6a9 9 0 0 1 18 0v6" fill="none" stroke="#ccced2" stroke-width="2" stroke-linecap="round"/>
  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" fill="none" stroke="#ccced2" stroke-width="2"/>
</svg>
'@

    # Arrow right (blue) for menu hover
    "header\arrow-right-blue.svg"                    = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
  <path d="M9 18l6-6-6-6" fill="none" stroke="#007ad9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
'@

    # Arrow right big (login menu)
    "header\arrow-right-big.svg"                     = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M9 18l6-6-6-6" fill="none" stroke="#514FA1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
'@

    # Login icon (person)
    "header\login-icon.svg"                          = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
  <circle cx="12" cy="8" r="4" fill="none" stroke="#514FA1" stroke-width="2"/>
  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="none" stroke="#514FA1" stroke-width="2" stroke-linecap="round"/>
</svg>
'@

    # New user icon
    "header\new-user-icon.svg"                       = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
  <circle cx="10" cy="8" r="4" fill="none" stroke="#514FA1" stroke-width="2"/>
  <path d="M2 20c0-4 3.6-7 8-7" fill="none" stroke="#514FA1" stroke-width="2" stroke-linecap="round"/>
  <line x1="18" y1="12" x2="18" y2="18" stroke="#514FA1" stroke-width="2" stroke-linecap="round"/>
  <line x1="15" y1="15" x2="21" y2="15" stroke="#514FA1" stroke-width="2" stroke-linecap="round"/>
</svg>
'@

    # Register icon
    "header\register-icon.svg"                       = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
  <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="#514FA1" stroke-width="2"/>
  <line x1="8" y1="8" x2="16" y2="8" stroke="#514FA1" stroke-width="2" stroke-linecap="round"/>
  <line x1="8" y1="12" x2="16" y2="12" stroke="#514FA1" stroke-width="2" stroke-linecap="round"/>
  <line x1="8" y1="16" x2="12" y2="16" stroke="#514FA1" stroke-width="2" stroke-linecap="round"/>
</svg>
'@

    # Compare icon (header footer link)
    "header\compare-icon.svg"                        = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
  <path d="M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5M12 3v18" fill="none" stroke="#514FA1" stroke-width="2" stroke-linecap="round"/>
</svg>
'@

    # Knowledge-hub arrow down
    "knowledge-hub\arrow-down.svg"                   = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
  <path d="M6 9l6 6 6-6" fill="none" stroke="#514FA1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
'@

    # Knowledge-hub search icon
    "knowledge-hub\Search.svg"                       = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
  <circle cx="11" cy="11" r="7" fill="none" stroke="#514FA1" stroke-width="2"/>
  <line x1="16.5" y1="16.5" x2="22" y2="22" stroke="#514FA1" stroke-width="2" stroke-linecap="round"/>
</svg>
'@

    # Knowledge-hub arrow left
    "knowledge-hub\Arrow_left.svg"                   = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
  <path d="M15 18l-6-6 6-6" fill="none" stroke="#514FA1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
'@

    # Scroller check icon
    "scroller\fs_card_check.svg"                     = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
  <circle cx="12" cy="12" r="10" fill="#514FA1"/>
  <path d="M8 12l3 3 5-5" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
'@

    # Scroller arrow-right-blue
    "scroller\arrow-right-blue.svg"                  = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
  <path d="M9 18l6-6-6-6" fill="none" stroke="#007ad9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
'@

    # Generic arrow right blue (root images)
    "arrow_right_blue.svg"                           = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
  <path d="M9 18l6-6-6-6" fill="none" stroke="#007ad9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
'@

    # Double quotes (testimonial)
    "double-quotes.svg"                              = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 40" width="50" height="40">
  <text x="0" y="35" font-size="50" fill="#514FA1" opacity="0.15" font-family="serif">"</text>
</svg>
'@

    # Bullet arrow right
    "bullet-arrow-right.svg"                         = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="12" height="12">
  <path d="M6 3l5 5-5 5" fill="none" stroke="#514FA1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
'@

    # Client stories arrow left/right
    "client-stories\arrow-left-icon.svg"             = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
  <circle cx="20" cy="20" r="19" fill="#fff" stroke="#514FA1" stroke-width="1.5"/>
  <path d="M23 14l-6 6 6 6" fill="none" stroke="#514FA1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
'@

    "client-stories\arrow-right-icon.svg"            = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
  <circle cx="20" cy="20" r="19" fill="#514FA1" stroke="#514FA1" stroke-width="1.5"/>
  <path d="M17 14l6 6-6 6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
'@

    # Banner play icon
    "client-stories\carousel-banner\banner-play.svg" = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <circle cx="32" cy="32" r="31" fill="rgba(255,255,255,0.9)"/>
  <polygon points="25,18 48,32 25,46" fill="#514FA1"/>
</svg>
'@
}

# Write each SVG
foreach ($key in $svgs.Keys) {
    $outPath = "$base\$key"
    $dir = Split-Path $outPath -Parent
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
    if (-not (Test-Path $outPath) -or (Get-Item $outPath).Length -lt 100) {
        $svgs[$key].Trim() | Set-Content -Path $outPath -Encoding UTF8
        Write-Host "CREATED: $key"
    }
    else {
        Write-Host "EXISTS:  $key ($([math]::Round((Get-Item $outPath).Length/1KB,1)) KB)"
    }
}

Write-Host "`nAll SVG icons processed."
