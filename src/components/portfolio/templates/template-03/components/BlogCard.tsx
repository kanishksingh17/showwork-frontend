import { Card } from './Card';
import { formatDate } from '@/lib/utils';

export function BlogCard({ blog, titleAs }: { blog: any, titleAs?: keyof JSX.IntrinsicElements }) {
    const as = titleAs ?? 'h2'
    return (
        <Card as="article">
            <Card.Title as={as} href={blog.url || '#'}>
                {blog.title}
            </Card.Title>
            <Card.Eyebrow as="time" dateTime={blog.date} decorate>
                {blog.date ? formatDate(blog.date) : ''}
            </Card.Eyebrow>
            <Card.Description>{blog.description}</Card.Description>
            <Card.Cta>Read blog</Card.Cta>
        </Card>
    )
}
