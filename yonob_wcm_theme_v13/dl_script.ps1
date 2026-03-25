$outPath = "c:\xampp\htdocs\drupal\web\themes\custom\yonob_wcm_theme\sbihome.html"
$url = "https://yonobusiness.sbi.bank.in/"
Invoke-WebRequest -Uri $url -OutFile $outPath -UseBasicParsing
Write-Host "Downloaded to $outPath"
