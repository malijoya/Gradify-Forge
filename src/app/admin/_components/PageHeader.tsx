export default function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: React.ReactNode; actions?: React.ReactNode }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h1>
                {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
            </div>
            {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
    );
}
