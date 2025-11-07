// Import tất cả utilities và configs theo cấu trúc category mới

// Text utilities
import TextConverter from './text/text-converter'
import TextConverterConfig from './text/text-converter/config'
import WordCounter from './text/word-counter'
import WordCounterConfig from './text/word-counter/config'
import Translator from './text/translator'
import TranslatorConfig from './text/translator/config'
import TextSplitMerge from './text/text-split-merge'
import TextSplitMergeConfig from './text/text-split-merge/config'
import VietnameseAccent from './text/vietnamese-accent'
import VietnameseAccentConfig from './text/vietnamese-accent/config'
import FontConverter from './text/font-converter'
import FontConverterConfig from './text/font-converter/config'
import TextSummarizer from './text/text-summarizer'
import TextSummarizerConfig from './text/text-summarizer/config'
import TextToFile from './text/text-to-file'
import TextToFileConfig from './text/text-to-file/config'
import SpellChecker from './text/spell-checker'
import SpellCheckerConfig from './text/spell-checker/config'
import SloganGenerator from './text/slogan-generator'
import SloganGeneratorConfig from './text/slogan-generator/config'

// Image utilities
import ImageEditor from './image/image-editor'
import ImageEditorConfig from './image/image-editor/config'
import ImageUploader from './image/image-uploader'
import ImageUploaderConfig from './image/image-uploader/config'
import QRGenerator from './image/qr-generator'
import QRGeneratorConfig from './image/qr-generator/config'
import OCRScanner from './image/ocr-scanner'
import OCRScannerConfig from './image/ocr-scanner/config'
import ImageBase64 from './image/image-base64'
import ImageBase64Config from './image/image-base64/config'
import ImageCompress from './image/image-compress'
import ImageCompressConfig from './image/image-compress/config'
import ImageConverter from './image/image-converter'
import ImageConverterConfig from './image/image-converter/config'
import ImageWatermark from './image/image-watermark'
import ImageWatermarkConfig from './image/image-watermark/config'
import QRReader from './image/qr-reader'
import QRReaderConfig from './image/qr-reader/config'
import ImageAI from './image/image-ai'
import ImageAIConfig from './image/image-ai/config'
import IconGenerator from './image/icon-generator'
import IconGeneratorConfig from './image/icon-generator/config'
import GradientGenerator from './image/gradient-generator'
import GradientGeneratorConfig from './image/gradient-generator/config'

// Developer utilities
import CodeFormatter from './developer/code-formatter'
import CodeFormatterConfig from './developer/code-formatter/config'
import ApiTester from './developer/api-tester'
import ApiTesterConfig from './developer/api-tester/config'
import JsonViewer from './developer/json-viewer'
import JsonViewerConfig from './developer/json-viewer/config'
import TokenChecker from './developer/token-checker'
import TokenCheckerConfig from './developer/token-checker/config'
import CodeMinify from './developer/code-minify'
import CodeMinifyConfig from './developer/code-minify/config'
import UUIDGenerator from './developer/uuid-generator'
import UUIDGeneratorConfig from './developer/uuid-generator/config'
import EncodeDecode from './developer/encode-decode'
import EncodeDecodeConfig from './developer/encode-decode/config'
import RegexTester from './developer/regex-tester'
import RegexTesterConfig from './developer/regex-tester/config'
import DiffChecker from './developer/diff-checker'
import DiffCheckerConfig from './developer/diff-checker/config'
import PingDNS from './developer/ping-dns'
import PingDNSConfig from './developer/ping-dns/config'
import FakeDataGenerator from './developer/fake-data-generator'
import FakeDataGeneratorConfig from './developer/fake-data-generator/config'

// Utility tools
import UrlShortener from './utility/url-shortener'
import UrlShortenerConfig from './utility/url-shortener/config'
import IpChecker from './utility/ip-checker'
import IpCheckerConfig from './utility/ip-checker/config'
import Calendar from './utility/calendar'
import CalendarConfig from './utility/calendar/config'
import TimerCountdown from './utility/timer-countdown'
import TimerCountdownConfig from './utility/timer-countdown/config'
import CurrencyConverter from './utility/currency-converter'
import CurrencyConverterConfig from './utility/currency-converter/config'
import TimezoneConverter from './utility/timezone-converter'
import TimezoneConverterConfig from './utility/timezone-converter/config'
import DateDiff from './utility/date-diff'
import DateDiffConfig from './utility/date-diff/config'
import Calculator from './utility/calculator'
import CalculatorConfig from './utility/calculator/config'
import UnitConverter from './utility/unit-converter'
import UnitConverterConfig from './utility/unit-converter/config'
import DomainChecker from './utility/domain-checker'
import DomainCheckerConfig from './utility/domain-checker/config'
import QuickNotes from './utility/quick-notes'
import QuickNotesConfig from './utility/quick-notes/config'

// Health utilities
import PeriodTracker from './health/period-tracker'
import PeriodTrackerConfig from './health/period-tracker/config'
import BMICalculator from './health/bmi-calculator'
import BMICalculatorConfig from './health/bmi-calculator/config'
import BMRCalculator from './health/bmr-calculator'
import BMRCalculatorConfig from './health/bmr-calculator/config'
import WaterCalculator from './health/water-calculator'
import WaterCalculatorConfig from './health/water-calculator/config'
import CalorieBurner from './health/calorie-burner'
import CalorieBurnerConfig from './health/calorie-burner/config'

// AI utilities
import AiChat from './ai/ai-chat'
import AiChatConfig from './ai/ai-chat/config'
import AIRewriter from './ai/ai-rewriter'
import AIRewriterConfig from './ai/ai-rewriter/config'
import AIPDFSummarizer from './ai/ai-pdf-summarizer'
import AIPDFSummarizerConfig from './ai/ai-pdf-summarizer/config'
import AIContentIdeas from './ai/ai-content-ideas'
import AIContentIdeasConfig from './ai/ai-content-ideas/config'
import TextToSpeech from './ai/text-to-speech'
import TextToSpeechConfig from './ai/text-to-speech/config'
import AIImageGenerator from './ai/ai-image-generator'
import AIImageGeneratorConfig from './ai/ai-image-generator/config'
import AISentiment from './ai/ai-sentiment'
import AISentimentConfig from './ai/ai-sentiment/config'
import AISeowriter from './ai/ai-seo-writer'
import AISeowriterConfig from './ai/ai-seo-writer/config'

// Support (giữ nguyên vì không thuộc category)
import Support from './support'
import SupportConfig from './support/config'

// Export tất cả utilities dưới dạng object
export const utilities = {
  // Text
  'text-converter': {
    component: TextConverter,
    config: TextConverterConfig
  },
  'word-counter': {
    component: WordCounter,
    config: WordCounterConfig
  },
  'translator': {
    component: Translator,
    config: TranslatorConfig
  },
  'text-split-merge': {
    component: TextSplitMerge,
    config: TextSplitMergeConfig
  },
  'vietnamese-accent': {
    component: VietnameseAccent,
    config: VietnameseAccentConfig
  },
  'font-converter': {
    component: FontConverter,
    config: FontConverterConfig
  },
  'text-summarizer': {
    component: TextSummarizer,
    config: TextSummarizerConfig
  },
  'text-to-file': {
    component: TextToFile,
    config: TextToFileConfig
  },
  'spell-checker': {
    component: SpellChecker,
    config: SpellCheckerConfig
  },
  'slogan-generator': {
    component: SloganGenerator,
    config: SloganGeneratorConfig
  },
  // Image
  'image-editor': {
    component: ImageEditor,
    config: ImageEditorConfig
  },
  'image-uploader': {
    component: ImageUploader,
    config: ImageUploaderConfig
  },
  'qr-generator': {
    component: QRGenerator,
    config: QRGeneratorConfig
  },
  'ocr-scanner': {
    component: OCRScanner,
    config: OCRScannerConfig
  },
  'image-base64': {
    component: ImageBase64,
    config: ImageBase64Config
  },
  'image-compress': {
    component: ImageCompress,
    config: ImageCompressConfig
  },
  'image-converter': {
    component: ImageConverter,
    config: ImageConverterConfig
  },
  'image-watermark': {
    component: ImageWatermark,
    config: ImageWatermarkConfig
  },
  'qr-reader': {
    component: QRReader,
    config: QRReaderConfig
  },
  'image-ai': {
    component: ImageAI,
    config: ImageAIConfig
  },
  'icon-generator': {
    component: IconGenerator,
    config: IconGeneratorConfig
  },
  'gradient-generator': {
    component: GradientGenerator,
    config: GradientGeneratorConfig
  },
  // Developer
  'code-formatter': {
    component: CodeFormatter,
    config: CodeFormatterConfig
  },
  'api-tester': {
    component: ApiTester,
    config: ApiTesterConfig
  },
  'json-viewer': {
    component: JsonViewer,
    config: JsonViewerConfig
  },
  'token-checker': {
    component: TokenChecker,
    config: TokenCheckerConfig
  },
  'code-minify': {
    component: CodeMinify,
    config: CodeMinifyConfig
  },
  'uuid-generator': {
    component: UUIDGenerator,
    config: UUIDGeneratorConfig
  },
  'encode-decode': {
    component: EncodeDecode,
    config: EncodeDecodeConfig
  },
  'regex-tester': {
    component: RegexTester,
    config: RegexTesterConfig
  },
  'diff-checker': {
    component: DiffChecker,
    config: DiffCheckerConfig
  },
  'ping-dns': {
    component: PingDNS,
    config: PingDNSConfig
  },
  'fake-data-generator': {
    component: FakeDataGenerator,
    config: FakeDataGeneratorConfig
  },
  // Utility
  'url-shortener': {
    component: UrlShortener,
    config: UrlShortenerConfig
  },
  'ip-checker': {
    component: IpChecker,
    config: IpCheckerConfig
  },
  'calendar': {
    component: Calendar,
    config: CalendarConfig
  },
  'timer-countdown': {
    component: TimerCountdown,
    config: TimerCountdownConfig
  },
  'currency-converter': {
    component: CurrencyConverter,
    config: CurrencyConverterConfig
  },
  'timezone-converter': {
    component: TimezoneConverter,
    config: TimezoneConverterConfig
  },
  'date-diff': {
    component: DateDiff,
    config: DateDiffConfig
  },
  'calculator': {
    component: Calculator,
    config: CalculatorConfig
  },
  'unit-converter': {
    component: UnitConverter,
    config: UnitConverterConfig
  },
  'domain-checker': {
    component: DomainChecker,
    config: DomainCheckerConfig
  },
  'quick-notes': {
    component: QuickNotes,
    config: QuickNotesConfig
  },
  // Health
  'period-tracker': {
    component: PeriodTracker,
    config: PeriodTrackerConfig
  },
  'bmi-calculator': {
    component: BMICalculator,
    config: BMICalculatorConfig
  },
  'bmr-calculator': {
    component: BMRCalculator,
    config: BMRCalculatorConfig
  },
  'water-calculator': {
    component: WaterCalculator,
    config: WaterCalculatorConfig
  },
  'calorie-burner': {
    component: CalorieBurner,
    config: CalorieBurnerConfig
  },
  // AI
  'ai-chat': {
    component: AiChat,
    config: AiChatConfig
  },
  'ai-rewriter': {
    component: AIRewriter,
    config: AIRewriterConfig
  },
  'ai-pdf-summarizer': {
    component: AIPDFSummarizer,
    config: AIPDFSummarizerConfig
  },
  'ai-content-ideas': {
    component: AIContentIdeas,
    config: AIContentIdeasConfig
  },
  'text-to-speech': {
    component: TextToSpeech,
    config: TextToSpeechConfig
  },
  'ai-image-generator': {
    component: AIImageGenerator,
    config: AIImageGeneratorConfig
  },
  'ai-sentiment': {
    component: AISentiment,
    config: AISentimentConfig
  },
  'ai-seo-writer': {
    component: AISeowriter,
    config: AISeowriterConfig
  },
  // Support
  'support': {
    component: Support,
    config: SupportConfig
  }
}

// Định nghĩa categories
export const categories = {
  'text': {
    id: 'text',
    name: 'Văn bản',
    icon: '📝'
  },
  'image': {
    id: 'image',
    name: 'Hình ảnh',
    icon: '🖼️'
  },
  'developer': {
    id: 'developer',
    name: 'Developer',
    icon: '💻'
  },
  'utility': {
    id: 'utility',
    name: 'Tiện ích',
    icon: '🔧'
  },
  'health': {
    id: 'health',
    name: 'Sức khỏe',
    icon: '🏥'
  },
  'ai': {
    id: 'ai',
    name: 'AI',
    icon: '🤖'
  }
}

// Mapping utilities to categories
const utilityCategories = {
  // Text
  'text-converter': 'text',
  'word-counter': 'text',
  'translator': 'text',
  'text-split-merge': 'text',
  'vietnamese-accent': 'text',
  'font-converter': 'text',
  'text-summarizer': 'text',
  'text-to-file': 'text',
  'spell-checker': 'text',
  'slogan-generator': 'text',
  // Image
  'image-editor': 'image',
  'image-uploader': 'image',
  'qr-generator': 'image',
  'ocr-scanner': 'image',
  'image-base64': 'image',
  'image-compress': 'image',
  'image-converter': 'image',
  'image-watermark': 'image',
  'qr-reader': 'image',
  'image-ai': 'image',
  'icon-generator': 'image',
  'gradient-generator': 'image',
  // Developer
  'code-formatter': 'developer',
  'api-tester': 'developer',
  'json-viewer': 'developer',
  'token-checker': 'developer',
  'code-minify': 'developer',
  'uuid-generator': 'developer',
  'encode-decode': 'developer',
  'regex-tester': 'developer',
  'diff-checker': 'developer',
  'ping-dns': 'developer',
  'fake-data-generator': 'developer',
  // Utility
  'url-shortener': 'utility',
  'ip-checker': 'utility',
  'calendar': 'utility',
  'timer-countdown': 'utility',
  'currency-converter': 'utility',
  'timezone-converter': 'utility',
  'date-diff': 'utility',
  'calculator': 'utility',
  'unit-converter': 'utility',
  'domain-checker': 'utility',
  'quick-notes': 'utility',
  // Health
  'period-tracker': 'health',
  'bmi-calculator': 'health',
  'bmr-calculator': 'health',
  'water-calculator': 'health',
  'calorie-burner': 'health',
  // AI
  'ai-chat': 'ai',
  'ai-rewriter': 'ai',
  'ai-pdf-summarizer': 'ai',
  'ai-content-ideas': 'ai',
  'text-to-speech': 'ai',
  'ai-image-generator': 'ai',
  'ai-sentiment': 'ai',
  'ai-seo-writer': 'ai'
}

// Group utilities by category
export const groupedUtilities = () => {
  const groups = {}
  
  Object.keys(utilities).forEach(id => {
    // Bỏ qua 'support' vì nó không phải là utility
    if (id === 'support') return
    
    const category = utilityCategories[id] || 'utility'
    if (!groups[category]) {
      groups[category] = {
        category: categories[category] || categories['utility'],
        items: []
      }
    }
    groups[category].items.push({
      id,
      ...utilities[id].config
    })
  })
  
  // Sort categories by predefined order
  const categoryOrder = ['text', 'image', 'developer', 'utility', 'health', 'ai']
  const sortedGroups = {}
  categoryOrder.forEach(catId => {
    if (groups[catId]) {
      sortedGroups[catId] = groups[catId]
    }
  })
  
  return sortedGroups
}

// Export danh sách configs để dùng trong Home page (backward compatibility)
export const utilitiesList = Object.values(utilities).map(u => u.config)

// Export function để lấy utility theo id
export const getUtility = (id) => {
  return utilities[id] || null
}
