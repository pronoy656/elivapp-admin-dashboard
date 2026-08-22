Add-Type -AssemblyName System.Drawing

$InputPath = "c:\office-project\eliv-app-dashboard\public\Frame 77.jpg"
$OutputPath = "c:\office-project\eliv-app-dashboard\public\Frame 77.jpg"
$TempPath = "c:\office-project\eliv-app-dashboard\public\Frame 77_opt.jpg"

$srcImage = [System.Drawing.Image]::FromFile($InputPath)
$w = $srcImage.Width
$h = $srcImage.Height

Write-Host "Original Frame 77.jpg: ${w}x${h}"

$MaxWidth = 1200
$MaxHeight = 1200

$ratioX = $MaxWidth / $w
$ratioY = $MaxHeight / $h
$ratio = [Math]::Min($ratioX, $ratioY)

if ($ratio -ge 1.0) {
    $ratio = 1.0
}

$newWidth = [int]($w * $ratio)
$newHeight = [int]($h * $ratio)

Write-Host "Resizing to: ${newWidth}x${newHeight}"

$canvas = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
$graphics = [System.Drawing.Graphics]::FromImage($canvas)

$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

$graphics.DrawImage($srcImage, 0, 0, $newWidth, $newHeight)

$srcImage.Dispose()
$graphics.Dispose()

$canvas.Save($TempPath)
$canvas.Dispose()

$oldSize = (Get-Item $InputPath).Length / 1MB
$newSize = (Get-Item $TempPath).Length / 1KB
Write-Host "Done! Reduced from $([Math]::Round($oldSize, 2)) MB to $([Math]::Round($newSize, 2)) KB"

Move-Item -Force $TempPath $OutputPath
