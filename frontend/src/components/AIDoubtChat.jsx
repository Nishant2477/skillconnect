import { useState } from "react";
import { Bot, Send, Sparkles } from "lucide-react";
import { analyzeCourseVideo, askCourseQuestion } from "../API/aiApi";

function AIDoubtChat({ courseId, courseName, token }) {
	const [question, setQuestion] = useState("");
	const [messages, setMessages] = useState([]);
	const [error, setError] = useState("");
	const [isSending, setIsSending] = useState(false);
	const [isAnalyzing, setIsAnalyzing] = useState(false);

	async function handleVideoAnalysis() {
		if (isAnalyzing || isSending) return;

		setError("");
		setIsAnalyzing(true);
		try {
			const result = await analyzeCourseVideo(courseId, token);
			setMessages((current) => [
				...current,
				{ role: "student", content: "Analyze the course video" },
				{ role: "analysis", content: result.analysis }
			]);
		} catch (requestError) {
			setError(requestError.message);
		} finally {
			setIsAnalyzing(false);
		}
	}

	async function handleSubmit(event) {
		event.preventDefault();
		const trimmedQuestion = question.trim();
		if (!trimmedQuestion || isSending || isAnalyzing) return;

		setMessages((current) => [
			...current,
			{ role: "student", content: trimmedQuestion }
		]);
		setQuestion("");
		setError("");
		setIsSending(true);

		try {
			const result = await askCourseQuestion(
				courseId,
				trimmedQuestion,
				token
			);
			setMessages((current) => [
				...current,
				{ role: "tutor", content: result.answer }
			]);
		} catch (requestError) {
			setError(requestError.message);
		} finally {
			setIsSending(false);
		}
	}

	return (
		<section className="w-full rounded-3xl border border-emerald-950/10 bg-white p-5 shadow-sm md:p-7">
			<div className="mb-5 flex items-center gap-3">
				<span className="flex size-10 items-center justify-center rounded-full bg-orange-100 text-orange-700">
					<Bot size={21} />
				</span>
				<div>
					<h2 className="text-xl font-bold text-emerald-950">Ask your course tutor</h2>
					<p className="text-sm text-emerald-950/60">{courseName}</p>
				</div>
			</div>

			<div className="mb-5 border-b border-emerald-950/10 pb-5">
				<button
					className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-emerald-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
					disabled={isAnalyzing || isSending}
					onClick={handleVideoAnalysis}
					type="button"
				>
					<Sparkles size={17} />
					{isAnalyzing ? "Analyzing course video..." : "Analyze course video"}
				</button>
			</div>

			<div className="mb-5 max-h-96 space-y-3 overflow-y-auto" aria-live="polite" aria-label="Tutor conversation">
				{messages.map((message, index) => (
					<div
						className={`max-w-[90%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm ${message.role === "student" ? "ml-auto bg-emerald-950 text-white" : "bg-emerald-50 text-emerald-950"}`}
						key={`${message.role}-${index}`}
					>
						{message.role === "analysis" && <p className="mb-1 font-bold">Video analysis</p>}
						{message.content}
					</div>
				))}
				{(isSending || isAnalyzing) && <p className="text-sm text-emerald-950/60" role="status">{isAnalyzing ? "Analyzing video captions..." : "Tutor is thinking..."}</p>}
			</div>

			{error && <p className="mb-3 text-sm text-red-700" role="alert">{error}</p>}

			<form className="flex items-end gap-2" onSubmit={handleSubmit}>
				<label className="sr-only" htmlFor="course-tutor-question">Your question</label>
				<textarea
					className="min-h-24 flex-1 resize-y rounded-xl border border-emerald-950/20 px-4 py-3 text-sm text-emerald-950 outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20"
					id="course-tutor-question"
					maxLength={2000}
					onChange={(event) => setQuestion(event.target.value)}
					placeholder="Ask a question about this course..."
					rows={4}
					value={question}
				/>
				<button
					aria-label="Send question"
					className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-orange-600 text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
					disabled={!question.trim() || isSending || isAnalyzing}
					title="Send question"
					type="submit"
				>
					<Send size={18} />
				</button>
			</form>
		</section>
	);
}

export default AIDoubtChat;
