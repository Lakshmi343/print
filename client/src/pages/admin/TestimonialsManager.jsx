import CrudManager from './CrudManager';
export default function TestimonialsManager() {
    return <CrudManager
        entity="testimonials" title="Testimonials" icon="💬"
        fields={[
            { name: 'name', label: 'Customer Name', placeholder: 'John Smith', required: true, primary: true },
            {
                name: 'rating', label: 'Rating', type: 'select', required: true, default: 5,
                options: [1, 2, 3, 4, 5].map(n => ({ value: n, label: '★'.repeat(n) + ' (' + n + '/5)' }))
            },
            { name: 'review', label: 'Review Text', type: 'textarea', placeholder: 'Write a review...', required: true },
            { name: 'active', label: 'Active', type: 'toggle', default: 1 },
        ]}
    />;
}
