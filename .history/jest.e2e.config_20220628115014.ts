import type { Config } from '@jest/types'
import { ConfigService } from './src/config/config.service'

const config: Config.InitialOptions = {
    verbose: true,
    preset: 'ts-jest',
    testRegex: '.e2e-spec.ts$'
}

export default config 