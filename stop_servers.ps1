param (
    [string[]]$scripts
)

# Define los nombres de los scripts que queremos cerrar
$allScriptNames = @(
    "conexion_cronograma/conexion_cronograma.js",
    "conexion_ejemplo/conexion_ejemplo.js",
    "cronogramas/cronogramas.js",
    "ejemplo_api/ejemplo.js",
    "main_api/__init__.js"
)

# Verificar si el parámetro 'scripts' contiene 'all'
if ($scripts -contains "all") {
    $scriptsToClose = $allScriptNames
} else {
    $scriptsToClose = @()
    foreach ($script in $scripts) {
        $matchedScript = $allScriptNames | Where-Object { $_ -like "*$script*" }
        if ($matchedScript) {
            $scriptsToClose += $matchedScript
        } else {
            Write-Output "Script $script not found in the list of running scripts."
        }
    }
}

# Imprimir los scripts que se intentarán cerrar
Write-Output "Attempting to close the following scripts:"
$scriptsToClose | ForEach-Object { Write-Output $_ }

# Obtén todos los procesos de PowerShell
$processes = Get-Process powershell | Where-Object { $_.MainWindowTitle -like "*node*" }

foreach ($process in $processes) {
    # Obtén los argumentos del proceso de PowerShell
    $commandLine = (Get-CimInstance Win32_Process -Filter "ProcessId = $($process.Id)").CommandLine

    # Revisa si el argumento contiene alguno de los nombres de los scripts
    foreach ($scriptName in $scriptsToClose) {
        if ($commandLine -like "*$scriptName*") {
            # Cierra el proceso de PowerShell
            Stop-Process -Id $process.Id -Force
            Write-Output "Closed process with Id $($process.Id) running script $scriptName"
            break
        } else {
            Write-Output "Process with Id $($process.Id) is not running $scriptName"
        }
    }
}
