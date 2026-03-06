import CrudManager from './CrudManager';
export default function ServicesManager() {
    return <CrudManager
        entity="services" title="Services" icon="🛠️"
        fields={[
            { name: 'title', label: 'Title', placeholder: 'Graphic Design', required: true, primary: true },
            { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Brief description...', required: true },
            { name: 'image', label: 'Image URL', placeholder: 'https://...', required: true, type: 'img' },
            { name: 'link', label: 'Link', placeholder: '/services/design', default: '#' },
            { name: 'order', label: 'Order', type: 'number', placeholder: '1', default: 0 },
            { name: 'active', label: 'Active', type: 'toggle', default: true },
        ]}
    />;
}
