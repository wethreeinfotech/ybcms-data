$base = "c:\xampp\htdocs\drupal\web\themes\custom\yonob_wcm_theme\images"

# Create required subdirectories
@("header","footer","carousel","client-stories","client-stories\carousel-banner","knowledge-hub","scroller") | ForEach-Object {
  New-Item -ItemType Directory -Force -Path "$base\$_" | Out-Null
}

$h = @{
  "Referer"    = "https://yonobusiness.sbi.bank.in/"
  "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
}

$files = @(
  @{ url="https://yonobusiness.sbi.bank.in/icon_Contrast.8754f04058ded215.svg"; out="$base\header\contrast-icon.svg" },
  @{ url="https://yonobusiness.sbi.bank.in/sbi-icon.b7b6f45d6093e33b.svg"; out="$base\header\sbi-icon.svg" },
  @{ url="https://yonobusiness.sbi.bank.in/Arrow_down.274d449845ac99e1.svg"; out="$base\header\arrow-down.svg" },
  @{ url="https://yonobusiness.sbi.bank.in/Externallink.3dc8e049b29e82bf.svg"; out="$base\header\external-link.svg" },
  @{ url="https://yonobusiness.sbi.bank.in/icon_Customersupport.52bf35d5c7ca7b6b.svg"; out="$base\header\customer-support.svg" },
  @{ url="https://yonobusiness.sbi.bank.in/assets/img/yono_logo.png"; out="$base\yono_logo.png" },
  @{ url="https://yonobusiness.sbi.bank.in/assets/img/Revamp/YonoLogo_Footer_white.svg"; out="$base\footer\yonoLogo-white.svg" },
  @{ url="https://yonobusiness.sbi.bank.in/assets/img/yono-favicon.png"; out="$base\header\yono-favicon.png" }
)

foreach ($f in $files) {
  try {
    Invoke-WebRequest -Uri $f.url -OutFile $f.out -Headers $h -TimeoutSec 20
    Write-Host "OK: $($f.out)"
  } catch {
    Write-Host "FAIL: $($f.out) - $($_.Exception.Message)"
  }
}

Write-Host "Download complete"
