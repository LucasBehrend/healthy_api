param (
    [string[]]$scripts
)

# Define los comandos
$allCommands = @{
    conexion_cronograma = 'node --env-file=local.env ./conexion_cronograma/conexion_cronograma.js'
    conexion_ejemplo = 'node --env-file=local.env ./conexion_ejemplo/conexion_ejemplo.js'
    cronogramas = 'node --env-file=local.env ./cronogramas/cronogramas.js'
    ejemplo = 'node --env-file=local.env ./ejemplo_api/ejemplo.js'
    main = 'node --env-file=local.env ./main_api/__init__.js'
}

if ($scripts -contains "all") {
    $commandsToRun = $allCommands.Values
} else {
    $commandsToRun = @()
    foreach ($script in $scripts) {
        if ($allCommands.ContainsKey($script)) {
            $commandsToRun += $allCommands[$script]
        } else {
            Write-Output "Script $script not found in the list of commands."
        }
    }
}

# Ejecuta cada comando en una nueva ventana de PowerShell
foreach ($cmd in $commandsToRun) {
    Start-Process powershell -ArgumentList "-NoExit", "-Command", $cmd
}
