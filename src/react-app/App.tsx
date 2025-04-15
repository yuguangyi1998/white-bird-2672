import React, { useState } from 'react';
import { Copy, RefreshCw, Scale as Male, Scale as Female, ChevronDown, ChevronUp, Cherry as CherryBlossom } from 'lucide-react';
import femaleNamesData from './assets/female-names.json';
import maleNamesData from './assets/male-names.json';
import familyNamesData from './assets/family-names.json';

// Navigation links
const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#faq', label: 'FAQ' },
  { href: 'mailto:support@mynamegenerator.com', label: 'Contact' }
];

// FAQ items
const faqItems = [
  {
    question: "How does the name generator work?",
    answer: "First, select your gender (Male or Female), then choose a name style like 'Cute & Adorable' or 'Strong & Powerful,' and click 'Generate Japanese Name' to get a unique name from our database."
  },
  {
    question: "What do the name styles mean?",
    answer: "Name styles let you personalize your Japanese name. For example, 'Cute & Adorable' gives sweet and endearing names, while 'Strong & Powerful' offers names that convey strength and determination."
  },
  {
    question: "Are the generated names authentic Japanese names?",
    answer: "Yes, the names contain real Japanese names, randomly combined based on your gender and style preferences."
  },
  {
    question: "Can I change the gender or style after generating a name?",
    answer: "Absolutely! Simply adjust your gender or name style selection and click 'Generate Japanese Name' or try again to get a new result."
  },
  {
    question: "Does the generator provide name meanings and pronunciation?",
    answer: "Yes, after generating a name, you'll see its pronunciation (e.g., 'yu-ki') and meaning (if available), along with the name in Romanized form and Japanese characters."
  }
];

const nameStyles = [
  { id: 'cute', label: 'Cute & Adorable', description: 'Names that sound sweet and endearing' },
  { id: 'elegant', label: 'Elegant & Graceful', description: 'Names with refined and sophisticated meanings' },
  { id: 'strong', label: 'Strong & Powerful', description: 'Names that convey strength and determination' },
  { id: 'nature', label: 'Nature & Harmony', description: 'Names inspired by natural elements' },
  { id: 'hope', label: 'Hope & Dreams', description: 'Names representing aspirations and bright futures' },
  { id: 'wisdom', label: 'Wisdom & Intelligence', description: 'Names associated with knowledge and insight' },
  { id: 'artistic', label: 'Artistic & Creative', description: 'Names reflecting artistic and creative qualities' },
  { id: 'peaceful', label: 'Peaceful & Serene', description: 'Names expressing tranquility and calmness' },
  { id: 'lucky', label: 'Lucky & Fortunate', description: 'Names believed to bring good fortune' },
  { id: 'unique', label: 'Unique & Special', description: 'Distinctive names with special meanings' }
];

const styleMeaningPatterns: Record<string, string[]> = {
  cute: [
    'Brings joy and sweetness like spring flowers',
    'As delightful as morning dew',
    'Gentle and charming like cherry blossoms',
    'Sweet and precious like a treasured pearl'
  ],
  elegant: [
    'Graceful as the autumn moon',
    'Refined like morning mist over mountains',
    'Noble as the imperial chrysanthemum',
    'Dignified as ancient traditions'
  ],
  strong: [
    'Powerful as the ocean waves',
    'Strong as the mountain peaks',
    'Enduring as the ancient pine',
    'Mighty as the summer storm'
  ],
  nature: [
    'Pure as mountain streams',
    'Vibrant as spring gardens',
    'Peaceful as forest depths',
    'Free as soaring birds'
  ],
  hope: [
    'Bright as the morning star',
    'Promise of new beginnings',
    'Light that guides the way',
    'Dawn of possibilities'
  ],
  wisdom: [
    'Deep as ancient knowledge',
    'Clear as still waters',
    'Wise as the sage\'s teachings',
    'Understanding as boundless as the sky'
  ],
  artistic: [
    'Creative as flowing brush strokes',
    'Expressive as poetry in motion',
    'Beautiful as traditional arts',
    'Imaginative as spring dreams'
  ],
  peaceful: [
    'Serene as temple gardens',
    'Tranquil as morning meditation',
    'Calm as moonlit waters',
    'Peaceful as gentle rain'
  ],
  lucky: [
    'Fortunate as spring sunshine',
    'Blessed by ancient spirits',
    'Lucky as morning stars',
    'Prosperous as golden harvests'
  ],
  unique: [
    'Special as the first snow',
    'Unique as mountain peaks',
    'Rare as precious gems',
    'Distinctive as morning glory'
  ]
};

interface NameData {
  kanji: string;
  romaji: string;
  meaning: string;
}

interface GeneratedName {
  japanese: string;
  kanji: string;
  romaji: string;
  meaning: string;
  pronunciation: string;
  elements: Array<{
    part: string;
    meaning: string;
  }>;
}

function App() {
  const [gender, setGender] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [generatedName, setGeneratedName] = useState<GeneratedName | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const generatePronunciation = (name: string): string => {
    const syllables = name.toLowerCase()
      .replace(/shi/g, 'ši')
      .replace(/chi/g, 'či')
      .replace(/tsu/g, 'cu')
      .split('')
      .join('·');
    return syllables;
  };

  const generateMeaning = (style: string, meaning: string): string => {
    const patterns = styleMeaningPatterns[style] || styleMeaningPatterns.unique;
    const pattern = patterns[Math.floor(Math.random() * patterns.length)];
    return `${pattern}. ${meaning}`;
  };

  const generateName = () => {
    const names = gender === 'female' ? femaleNamesData.names : maleNamesData.names;
    const firstName: NameData = names[Math.floor(Math.random() * names.length)];
    const lastName: NameData = familyNamesData.names[Math.floor(Math.random() * familyNamesData.names.length)];
    
    const newName: GeneratedName = {
      japanese: `${lastName.romaji} ${firstName.romaji}`,
      kanji: `${lastName.kanji} ${firstName.kanji}`,
      romaji: `${lastName.romaji} ${firstName.romaji}`,
      meaning: generateMeaning(selectedStyle, `${firstName.meaning} (given name) combined with ${lastName.meaning} (family name)`),
      pronunciation: generatePronunciation(firstName.romaji),
      elements: [
        {
          part: firstName.kanji,
          meaning: firstName.meaning
        },
        {
          part: lastName.kanji,
          meaning: lastName.meaning
        }
      ]
    };

    setGeneratedName(newName);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <a href="#home" className="flex items-center space-x-2">
              <CherryBlossom className="h-8 w-8 text-pink-500" />
              <span className="text-xl font-bold text-gray-900">My Name Generator</span>
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Create Your Unique Japanese Name Today!
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Generate authentic Japanese-style names inspired by the beauty of Japanese culture.
          </p>
        </section>

        {/* Generator Section */}
        <section className="max-w-4xl mx-auto px-4 mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="space-y-6">
              {/* Gender Selection */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-4">Choose Gender (Required)</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setGender('male')}
                    className={`p-4 rounded-lg border-2 transition-all flex items-center justify-center gap-3 ${
                      gender === 'male'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    <Male className="w-6 h-6 text-blue-600" />
                    <span className="text-lg">Male</span>
                  </button>
                  <button
                    onClick={() => setGender('female')}
                    className={`p-4 rounded-lg border-2 transition-all flex items-center justify-center gap-3 ${
                      gender === 'female'
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-200 hover:border-pink-200'
                    }`}
                  >
                    <Female className="w-6 h-6 text-pink-600" />
                    <span className="text-lg">Female</span>
                  </button>
                </div>
              </div>

              {/* Name Style Selection */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-4">Select Name Style</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {nameStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        selectedStyle === style.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-200'
                      }`}
                    >
                      <div className="font-medium">{style.label}</div>
                      <div className="text-sm text-gray-500">{style.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateName}
                disabled={!gender}
                className={`w-full py-4 px-6 rounded-lg text-white text-lg font-medium transition-all ${
                  gender
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Generate Japanese Name
              </button>
            </div>
          </div>

          {/* Generated Name Display */}
          {generatedName && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold mb-2">{generatedName.kanji}</h2>
                <div className="flex items-center justify-center gap-2">
                  <p className="text-xl text-gray-600">{generatedName.romaji}</p>
                  <button
                    onClick={() => copyToClipboard(`${generatedName.kanji} (${generatedName.romaji})`)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-5 h-5 text-gray-500" />
                  </button>
                  <button
                    onClick={generateName}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    title="Generate new name"
                  >
                    <RefreshCw className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700">Pronunciation:</h3>
                  <p className="text-gray-600">{generatedName.pronunciation}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">Meaning:</h3>
                  <p className="text-gray-600">{generatedName.meaning}</p>
                </div>
                {generatedName.elements.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-700">Name Elements:</h3>
                    <div className="space-y-2">
                      {generatedName.elements.map((element, index) => (
                        <div key={index} className="text-gray-600">
                          {element.part}: {element.meaning}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-blue-100 rounded-full">
                <Male className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Step 1: Choose Your Gender</h3>
              <p className="text-gray-600">Select your preferred gender (Male or Female) to generate a name that suits your choice.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-purple-100 rounded-full">
                <CherryBlossom className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Step 2: Pick a Name Style</h3>
              <p className="text-gray-600">Choose a style that resonates with you to personalize your Japanese name.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-green-100 rounded-full">
                <RefreshCw className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Step 3: Generate Your Name</h3>
              <p className="text-gray-600">Click the button to instantly receive a unique name with meaning and pronunciation.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium text-gray-900">{item.question}</span>
                  {openFaqIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 py-4 bg-gray-50">
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-600">
          <p>© 2024 My Name Generator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
