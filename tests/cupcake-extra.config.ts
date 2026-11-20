import {defineConfig} from '@playwright/test'
import base from '../playwright.config'
import {resolve} from 'node:path'
export default defineConfig({...base,webServer:{command:`"${process.execPath}" node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 4280 --strictPort`,cwd:resolve(import.meta.dirname,'..'),url:'http://127.0.0.1:4280/kids-cooking-studio/',reuseExistingServer:false},use:{...base.use,serviceWorkers:'allow'},testDir:'.',testMatch:['cupcake-extra.spec.ts','cupcake-three.spec.ts'],grep:undefined,reporter:'line'})
