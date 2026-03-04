import CrudManager from './CrudManager';
export default function CTAButtonsManager() {
    return <CrudManager
        entity="cta-buttons" title="CTA Buttons" icon="🔘"
        fields={[
            { name: 'label', label: 'Button Label', placeholder: 'Request a Quote', required: true, primary: true },
            { name: 'link', label: 'Link/URL', placeholder: '/quote', required: true },
            { name: 'order', label: 'Order', type: 'number', placeholder: '1', default: 0 },
            { name: 'active', label: 'Active', type: 'toggle', default: 1 },
        ]}
    />;
}
