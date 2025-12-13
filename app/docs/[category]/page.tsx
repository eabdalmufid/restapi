export default async function DocsCategoryPage(props: { params: Promise<{ category: string[] }> }) {
    const params = await props.params;
    const path = params.category || [];

    console.log(path);
    return (
        <div className="mx-auto flex max-w-4xl flex-col items-center p-6">
            {JSON.stringify(params)}
        </div>
    );
}
