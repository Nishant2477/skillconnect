import { Check, Plus, RotateCcw } from "lucide-react";

function CourseForm({
    name,
    instructor,
    price,
    category,
    playlistUrl,
    videoDuration,
    onNameChange,
    onInstructorChange,
    onPriceChange,
    onCategoryChange,
    onPlaylistUrlChange,
    onVideoDurationChange,
    onSubmit,
    editingId
}) {
    return (
        <form className="rounded-2xl border border-emerald-950/10 bg-white p-6 shadow-sm" onSubmit={onSubmit}>
            <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">Catalog editor</p>
                <h2 className="mt-2 text-2xl font-bold text-emerald-950">{editingId !== null ? "Edit course" : "Add a course"}</h2>
            </div>
            <div className="space-y-4">
                <label className="block text-sm font-bold text-emerald-950">Course name<input className="mt-2 w-full rounded-xl border border-emerald-950/15 bg-[#f5f7f4] px-4 py-3 outline-none transition focus:border-orange-700 focus:ring-2 focus:ring-orange-700/15" type="text" placeholder="e.g. Product Design" value={name} onChange={onNameChange} required /></label>
                <label className="block text-sm font-bold text-emerald-950">Instructor<input className="mt-2 w-full rounded-xl border border-emerald-950/15 bg-[#f5f7f4] px-4 py-3 outline-none transition focus:border-orange-700 focus:ring-2 focus:ring-orange-700/15" type="text" placeholder="Instructor name" value={instructor} onChange={onInstructorChange} required /></label>
                <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-bold text-emerald-950">Price<input className="mt-2 w-full rounded-xl border border-emerald-950/15 bg-[#f5f7f4] px-4 py-3 outline-none transition focus:border-orange-700 focus:ring-2 focus:ring-orange-700/15" type="number" min="0" placeholder="999" value={price} onChange={onPriceChange} required /></label>
                    <label className="block text-sm font-bold text-emerald-950">Category<input className="mt-2 w-full rounded-xl border border-emerald-950/15 bg-[#f5f7f4] px-4 py-3 outline-none transition focus:border-orange-700 focus:ring-2 focus:ring-orange-700/15" type="text" placeholder="Programming" value={category} onChange={onCategoryChange} required /></label>
                </div>
                <label className="block text-sm font-bold text-emerald-950">Course video duration (HH:MM:SS)<input className="mt-2 w-full rounded-xl border border-emerald-950/15 bg-[#f5f7f4] px-4 py-3 outline-none transition focus:border-orange-700 focus:ring-2 focus:ring-orange-700/15" type="text" inputMode="numeric" pattern="[0-9]{1,3}:[0-5][0-9]:[0-5][0-9]" placeholder="18:34:21" value={videoDuration} onChange={onVideoDurationChange} /></label>
                <label className="block text-sm font-bold text-emerald-950">YouTube playlist URL<input className="mt-2 w-full rounded-xl border border-emerald-950/15 bg-[#f5f7f4] px-4 py-3 outline-none transition focus:border-orange-700 focus:ring-2 focus:ring-orange-700/15" type="url" placeholder="https://www.youtube.com/playlist?list=..." value={playlistUrl} onChange={onPlaylistUrlChange} /></label>
            </div>
            <div className="mt-7 flex gap-3">
                <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-700 px-4 py-3 font-bold text-white transition hover:bg-orange-800" type="submit">
                    {editingId !== null ? <Check size={17} /> : <Plus size={17} />}
                    {editingId !== null ? "Update course" : "Add course"}
                </button>
                {editingId !== null && <button className="rounded-xl border border-emerald-950/15 px-4 text-emerald-950 transition hover:bg-emerald-50" type="button" title="Cancel editing" onClick={() => window.location.reload()}><RotateCcw size={17} /></button>}
            </div>
        </form>
    );
}

export default CourseForm;