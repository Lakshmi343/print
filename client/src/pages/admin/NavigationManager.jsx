import CrudManager from './CrudManager';
export default function NavigationManager() {
    return <CrudManager
        entity="menu" title="Navigation Menu" icon="🔗"
        fields={[
            { name: 'label', label: 'Label', placeholder: 'Home', required: true, primary: true },
            { name: 'link', label: 'Link/URL', placeholder: '/', required: true },
            { name: 'icon', label: 'Icon (Upload)', type: 'img' },
            { name: 'order', label: 'Order', type: 'number', placeholder: '1', default: 0 },
            { name: 'active', label: 'Active', type: 'toggle', default: true },
        ]}
    />;
}
