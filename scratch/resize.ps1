Add-Type -AssemblyName System.Drawing

function Resize-Image {
    param (
        [string]$InputPath,
        [string]$OutputPath,
        [int]$MaxWidth,
        [int]$MaxHeight
    )

    $srcImage = [System.Drawing.Image]::FromFile($InputPath)
    $w = $srcImage.Width
    $h = $srcImage.Height

    Write-Host "Original Dimensions: ${w}x${h}"

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

    $canvas.Save($OutputPath)
    $canvas.Dispose()

    $oldSize = (Get-Item $InputPath).Length / 1MB
    $newSize = (Get-Item $OutputPath).Length / 1KB
    Write-Host "Done! Reduced from $([Math]::Round($oldSize, 2)) MB to $([Math]::Round($newSize, 2)) KB"
}

$cwd = Get-Location

Resize-Image -InputPath "$cwd/public/brand-logo.png" -OutputPath "$cwd/public/brand-logo.png.opt" -MaxWidth 600 -MaxHeight 600
Resize-Image -InputPath "$cwd/public/brand-logo-tag.png" -OutputPath "$cwd/public/brand-logo-tag.png.opt" -MaxWidth 800 -MaxHeight 400
Resize-Image -InputPath "$cwd/public/Dashboard.jpg" -OutputPath "$cwd/public/Dashboard.jpg.opt" -MaxWidth 1200 -MaxHeight 800
