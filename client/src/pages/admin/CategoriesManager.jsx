import CrudManager from './CrudManager';
export default function CategoriesManager() {
    return <CrudManager
        entity="categories" title="Categories" icon="📦"
        fields={[
            { name: 'name', label: 'Name', placeholder: 'Business Cards', required: true, primary: true },
            { name: 'slug', label: 'Slug', placeholder: 'business-cards', required: true },
            { name: 'image', label: 'Image URL', placeholder: 'https://...', required: true, type: 'img' },
            { name: 'order', label: 'Order', type: 'number', placeholder: '1', default: 0 },
            { name: 'active', label: 'Active', type: 'toggle', default: 1 },
        ]}
    />;
}
