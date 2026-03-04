import CrudManager from './CrudManager';
export default function HighlightsManager() {
    return <CrudManager
        entity="highlights" title="Highlights" icon="✨"
        fields={[
            { name: 'icon', label: 'Icon (Emoji)', placeholder: '🖨️', required: true, primary: true, emoji: true },
            { name: 'title', label: 'Title', placeholder: 'High Quality', required: true },
            { name: 'order', label: 'Order', type: 'number', placeholder: '1', default: 0 },
            { name: 'active', label: 'Active', type: 'toggle', default: 1 },
        ]}
    />;
}
