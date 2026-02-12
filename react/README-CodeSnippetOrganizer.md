# Code Snippet Organizer

A comprehensive React/TypeScript component for managing and organizing code snippets with search, filtering, and categorization features.

## 📋 Description

The `CodeSnippetOrganizer` component provides developers with a powerful tool to save, organize, search, and quickly access their favorite code snippets. Perfect for maintaining a personal code library with support for multiple programming languages and tags.

## ✨ Features

- 💾 **Save Snippets**: Add code snippets with title, description, and tags
- 🔍 **Search**: Full-text search across titles and code
- 🏷️ **Filter by Language**: Filter snippets by programming language
- 🔖 **Tag System**: Organize with custom tags
- 📋 **One-Click Copy**: Copy code to clipboard instantly
- 🗑️ **Delete**: Remove unwanted snippets
- 📊 **Statistics**: View total snippets, languages, and tags
- 🎨 **Dark Mode**: Full light/dark theme support
- 📱 **Responsive**: Works on all screen sizes

## 🚀 Usage

### Basic Implementation

```tsx
import CodeSnippetOrganizer from '@/components/CodeSnippetOrganizer';

function App() {
  const snippets = [
    {
      id: '1',
      title: 'Array Sort',
      code: 'const sorted = arr.sort((a, b) => a - b);',
      language: 'javascript',
      tags: ['array', 'sort'],
      description: 'Sort array of numbers',
      createdAt: new Date()
    }
  ];

  return (
    <CodeSnippetOrganizer
      initialSnippets={snippets}
      onSave={(snippets) => {
        // Save to localStorage or database
        localStorage.setItem('snippets', JSON.stringify(snippets));
      }}
    />
  );
}
```

### With Local Storage Persistence

```tsx
import { useState, useEffect } from 'react';
import CodeSnippetOrganizer from '@/components/CodeSnippetOrganizer';

function SnippetManager() {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('code-snippets');
    if (saved) {
      setSnippets(JSON.parse(saved));
    }
  }, []);

  const handleSave = (updatedSnippets) => {
    localStorage.setItem('code-snippets', JSON.stringify(updatedSnippets));
  };

  return (
    <CodeSnippetOrganizer
      initialSnippets={snippets}
      onSave={handleSave}
    />
  );
}
```

## 📦 Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `initialSnippets` | `CodeSnippet[]` | No | Array of initial code snippets |
| `onSave` | `(snippets: CodeSnippet[]) => void` | No | Callback when snippets are updated |

### CodeSnippet Interface

```typescript
interface CodeSnippet {
  id: string;                // Unique identifier
  title: string;             // Snippet title
  code: string;              // The actual code
  language: string;          // Programming language
  tags: string[];            // Category tags
  description?: string;      // Optional description
  createdAt: Date;           // Creation timestamp
}
```

## 🎨 UI Components

### Header Section
- Title and subtitle
- "Add Snippet" button
- Statistics cards showing:
  - Total snippets count
  - Number of languages
  - Number of tags

### Filter Bar
- **Search**: Text input with search icon
- **Language Filter**: Dropdown to filter by language
- **Tag Filter**: Dropdown to filter by tags

### Add Snippet Modal
Form fields:
- Title (required)
- Language selector
- Code textarea (required)
- Description (optional)
- Tags input
- Save/Cancel buttons

### Snippet Cards
Each snippet displays:
- Title and description
- Language badge
- Tag badges
- Copy button (with success animation)
- Delete button
- Syntax-highlighted code block

## 📸 Visual Layout

```
┌───────────────────────────────────────────────┐
│ Code Snippet Organizer        [+ Add Snippet]│
│ Save and organize your code snippets          │
├───────────────────────────────────────────────┤
│ [Total: 15] [Languages: 5] [Tags: 12]        │
├───────────────────────────────────────────────┤
│ [🔍 Search] [Language ▼] [Tags ▼]            │
├───────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────┐  │
│ │ Array Sort Function          [📋] [🗑️] │  │
│ │ javascript  #array #sort               │  │
│ │ Sort array of numbers                   │  │
│ │ ┌─────────────────────────────────────┐ │  │
│ │ │ const sorted = arr.sort((a,b)=>a-b) │ │  │
│ │ └─────────────────────────────────────┘ │  │
│ └─────────────────────────────────────────┘  │
└───────────────────────────────────────────────┘
```

## 🎯 Features Breakdown

### Search Functionality
- Searches through snippet titles
- Searches through code content
- Case-insensitive matching
- Real-time filtering

### Filter System
- **Language Filter**: Shows only snippets of selected language
- **Tag Filter**: Shows only snippets with selected tag
- **Combined Filters**: All filters work together

### Copy to Clipboard
- One-click copy functionality
- Visual feedback (check icon for 2 seconds)
- Uses Clipboard API

### Statistics
- Auto-calculated from snippets array
- Updates in real-time
- Color-coded cards

## 🎨 Styling

### Color Scheme
- **Blue**: Primary actions, JavaScript
- **Purple**: Language count stats
- **Green**: Tags count stats, success states
- **Gray**: Neutral elements, delete actions

### Dark Mode
- Automatic theme adaptation
- Dark backgrounds: `dark:bg-gray-800`
- Dark text: `dark:text-white`
- Dark borders: `dark:border-gray-700`

## 🔧 Technical Details

### Dependencies
- React
- TypeScript
- Tailwind CSS
- Lucide React icons (Code, Copy, Check, Search, Tag, Trash2, Plus, Filter)

### State Management
- Local state with `useState`
- Props for initial data
- Callback for persistence

### Supported Languages
- JavaScript
- TypeScript
- Python
- Java
- CSS
- HTML
- Other (custom)

## 💾 Data Persistence Example

```typescript
// Save to localStorage
const handleSave = (snippets: CodeSnippet[]) => {
  localStorage.setItem('dev-snippets', JSON.stringify(snippets));
};

// Load from localStorage
const loadSnippets = (): CodeSnippet[] => {
  const saved = localStorage.getItem('dev-snippets');
  return saved ? JSON.parse(saved) : [];
};
```

## 📱 Integration Examples

### In Developer Dashboard
```tsx
<Dashboard>
  <Sidebar />
  <MainContent>
    <CodeSnippetOrganizer
      initialSnippets={userSnippets}
      onSave={saveToDatabase}
    />
  </MainContent>
</Dashboard>
```

### As Standalone Tool
```tsx
<Layout>
  <Header title="My Code Library" />
  <CodeSnippetOrganizer
    initialSnippets={loadFromStorage()}
    onSave={saveToStorage}
  />
</Layout>
```

## 💡 Use Cases

- **Personal Code Library**: Save frequently used code snippets
- **Learning Tool**: Organize code examples while learning
- **Team Knowledge Base**: Share common code patterns
- **Interview Prep**: Store algorithm solutions
- **Quick Reference**: Access boilerplate code quickly

## 🔄 Future Enhancements

Potential additions:
- Syntax highlighting (highlight.js)
- Export/Import snippets (JSON)
- Snippet sharing (URL generation)
- Version history
- Folder organization
- Code execution/preview
- Favorites/starred snippets
- Markdown support in descriptions
- Multi-language search
- Snippet templates

## 🧪 Testing Example

```typescript
test('filters snippets by language', () => {
  const snippets = [
    { id: '1', language: 'javascript', ... },
    { id: '2', language: 'python', ... }
  ];
  
  render(<CodeSnippetOrganizer initialSnippets={snippets} />);
  
  fireEvent.change(screen.getByRole('combobox'), {
    target: { value: 'javascript' }
  });
  
  expect(screen.getAllByRole('article')).toHaveLength(1);
});
```

## 👨‍💻 Author

**Ashvin**
- GitHub: [@ashvin2005](https://github.com/ashvin2005)
- LinkedIn: [ashvin-tiwari](https://linkedin.com/in/ashvin-tiwari)

## 🎃 Hacktoberfest 2025

Created as part of Hacktoberfest 2025 contributions to Amazing-Dev-Components.

## 📄 License

MIT License - Same as Amazing-Dev-Components project

---

Made with ❤️ for the developer community