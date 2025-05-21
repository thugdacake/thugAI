Config = {}

-- Configurações Gerais
Config.Debug = false
Config.Locale = 'pt-BR'

-- Configurações do Banco de Dados
Config.Database = {
    TablePrefix = 'thug_',
    UseOxmysql = true
}

-- Configurações de Performance
Config.Performance = {
    CacheTimeout = 300, -- 5 minutos
    MaxConnections = 10
}

-- Configurações de Segurança
Config.Security = {
    RequireAuth = true,
    MaxAttempts = 3,
    BanDuration = 24 -- horas
}

-- Configurações de UI
Config.UI = {
    DefaultTheme = 'dark',
    Animations = true,
    SoundEffects = true
}

-- Configurações de Logs
Config.Logs = {
    Enabled = true,
    Level = 'info', -- debug, info, warn, error
    SaveToFile = true
}

-- Configurações de Notificações
Config.Notifications = {
    Position = 'top-right',
    Duration = 5000, -- ms
    Sound = true
}

-- Configurações de Comandos
Config.Commands = {
    Prefix = '/',
    AdminOnly = {
        'admin',
        'ban',
        'kick'
    }
}

-- Configurações de Eventos
Config.Events = {
    Client = {
        'thug:client:init',
        'thug:client:update'
    },
    Server = {
        'thug:server:init',
        'thug:server:update'
    }
}

return Config 