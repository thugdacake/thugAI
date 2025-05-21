fx_version 'cerulean'
game 'gta5'

author 'ThugAI'
description 'Template base para projetos FiveM'
version '1.0.0'

shared_scripts {
    '@ox_lib/init.lua',
    'config.lua'
}

client_scripts {
    'client/*.lua'
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/*.lua'
}

ui_page 'html/dist/index.html'

files {
    'html/dist/index.html',
    'html/dist/assets/*'
}

dependencies {
    'ox_lib',
    'oxmysql',
    'qbx_core'
}

lua54 'yes' 