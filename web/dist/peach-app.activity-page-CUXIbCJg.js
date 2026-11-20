(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "bd627e15-17d2-4546-b3eb-46b7a61a0af9", e._sentryDebugIdIdentifier = "sentry-dbid-bd627e15-17d2-4546-b3eb-46b7a61a0af9");
	} catch {}
})();
import { Button as e, Bx as t, Chip as n, DataTableFooter as r, Disclosure as i, DownloadsPanel as a, EmptyState as o, Gg as s, HN as c, IssueRow as l, LinkButton as u, Lo as d, Ma as f, NameLink as p, Note as m, OV as h, Pf as g, ProcessingMode as _, RB as v, RUNNING_POLL_MS as y, Rk as b, Su as x, TASKS_KEY as S, TRIGGER_LABELS as C, TaskProgress as w, Xl as T, __toESM as E, activityKind as D, apiGet as O, apiSend as k, busyProps as A, cardClass as ee, codedText as j, confirmModal as M, controlTask as te, cx as ne, elapsedText as re, errorMessage as N, fetchTasks as ie, fmtSize as ae, foldByKind as oe, foldRoutine as se, followupDetail as ce, followupTally as P, groupFollowups as le, hasResultProblems as F, i2 as ue, interfaceLanguage as de, isActive as I, isRoutine as fe, latestOfKind as pe, momentText as L, notifyManager as me, oe as he, pollInterval as ge, problemDestination as _e, progressLabel as ve, progressText as R, readableErrorHeadline as z, replaceEqualDeep as ye, require_jsx_runtime as be, require_react as xe, runError as B, setTaskSpeed as Se, statusLabel as Ce, summaryItems as we, t as V, taskIssues as Te, taskName as H, taskSubject as Ee, um as De, uo as Oe, useMutation as U, useQuery as W, useQueryClient as G, vl as ke, withBackoff as K } from "./peach-app.js";
import { CodeBlock as Ae } from "./peach-app.code-block-CXu10nIP.js";
import { Page as je } from "./peach-app.page-QAncjzM1.js";
import { ErrorDetails as Me, ErrorExcerpt as Ne } from "./peach-app.error-excerpt-Ugft6I5o.js";
// node_modules/@tanstack/react-query/build/modern/useMutationState.js
var q = /* @__PURE__ */ E(xe(), 1);
function Pe() {
	let e;
	return (t, n) => {
		let r = [], i;
		return () => {
			let a = t.findAll(n.filters), o = a.flatMap((e) => [e, e.state]);
			return (!i || o.length !== r.length || o.some((e, t) => !Object.is(e, r[t]))) && (r = o, i = ye(e, a.map((e) => n.select ? n.select(e) : e.state)), e = i), i;
		};
	};
}
function Fe(e = {}, t) {
	let n = G(t).getMutationCache(), [r] = q.useState(() => Pe()), i = r(n, e);
	return q.useSyncExternalStore(q.useCallback((e) => n.subscribe(me.batchCalls(e)), [n]), i, i);
}
// src/react/activity/background-issues.tsx
var J = be(), Ie = ["background-issues"], Le = K(() => 3e4);
function Re() {
	let e = (0, q.useId)(), t = W({
		queryKey: Ie,
		queryFn: ({ signal: e }) => O("/api/background-issues", e),
		refetchInterval: Le
	}).data?.issues || [];
	return t.length ? /* @__PURE__ */ (0, J.jsxs)("section", {
		"aria-labelledby": e,
		className: "flex min-w-0 flex-col gap-3",
		children: [/* @__PURE__ */ (0, J.jsx)("h3", {
			id: e,
			className: "text-title-2-medium text-text-primary",
			children: V("manage:backgroundIssues.title")
		}), /* @__PURE__ */ (0, J.jsx)("ul", {
			className: "flex min-w-0 flex-col gap-3",
			children: t.map((e) => /* @__PURE__ */ (0, J.jsx)("li", { children: /* @__PURE__ */ (0, J.jsx)(ze, { issue: e }) }, e.key))
		})]
	}) : null;
}
function ze({ issue: t }) {
	let n = G(), r = U({
		mutationFn: () => k(t.retry, {}),
		onSuccess: () => {
			n.invalidateQueries({ queryKey: Ie });
		}
	}), i = t.since ? V("manage:backgroundIssues.since", { time: L(t.since) }) : V("manage:backgroundIssues.detectedAt", { time: L(t.noticed_at) });
	return /* @__PURE__ */ (0, J.jsx)(m, {
		tone: "error",
		title: j(t, "title"),
		action: /* @__PURE__ */ (0, J.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ (0, J.jsx)(u, {
				href: t.href,
				size: "small",
				trailingIcon: ue,
				children: j(t, "link_label")
			}), t.retry ? /* @__PURE__ */ (0, J.jsx)(e, {
				variant: "secondary",
				size: "small",
				disabled: !t.retry_available,
				...A(r.isPending),
				onClick: () => r.mutate(),
				children: V("manage:shared.retryNow")
			}) : null]
		}),
		children: r.error ? V("manage:backgroundIssues.retryFailed", {
			moment: i,
			error: N(r.error)
		}) : i
	});
}
// src/react/activity/task-controls.tsx
var Y = ["task-control"], Be = {
	pause: h,
	resume: s,
	cancel: c
}, Ve = {
	pause: V("manage:shared.pause"),
	resume: V("manage:shared.resume"),
	cancel: V("manage:taskControls.cancelTask")
}, He = {
	pause: V("manage:taskControls.pauseFollowups"),
	resume: V("manage:taskControls.resumeFollowups"),
	cancel: V("manage:taskControls.cancelFollowups")
};
function Ue() {
	let e = Fe({
		filters: { mutationKey: Y },
		select: (e) => ({
			id: e.mutationId,
			command: e.state.variables,
			status: e.state.status,
			error: e.state.error
		})
	}), t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = n.command;
		if (!e) continue;
		let r = t.get(e.id);
		(!r || r.id < n.id) && t.set(e.id, {
			...n,
			command: e
		});
	}
	let n = [...t.values()].filter((e) => e.status === "error");
	return n.length ? /* @__PURE__ */ (0, J.jsx)("div", {
		"data-task-control-feedback": "",
		className: "flex min-w-0 flex-col gap-2",
		children: n.map(({ command: e, error: t }) => /* @__PURE__ */ (0, J.jsx)(m, {
			tone: "error",
			title: V("manage:taskControls.actionFailed", {
				task: e.label,
				action: (e.followups ? He : Ve)[e.action]
			}),
			children: N(t)
		}, e.id))
	}) : null;
}
function We({ run: t, runs: n = [t] }) {
	let r = G(), i = (0, q.useRef)({
		change: !1,
		cancel: !1,
		confirmation: !1
	}), a = () => {
		r.invalidateQueries({ queryKey: S });
	}, o = async (e) => {
		let t = null;
		for (let r of n) try {
			await te(r.id, e.action);
		} catch (e) {
			t ??= e;
		}
		if (t !== null) throw t;
	}, s = U({
		mutationKey: [
			...Y,
			t.id,
			"change"
		],
		mutationFn: o,
		onSettled: () => {
			i.current.change = !1, a();
		}
	}), c = U({
		mutationKey: [
			...Y,
			t.id,
			"cancel"
		],
		mutationFn: o,
		onSettled: () => {
			i.current.cancel = !1, a();
		}
	}), l = U({
		mutationFn: async (e) => {
			let t = (await Promise.allSettled(n.map((t) => Se(t.id, e)))).find((e) => e.status === "rejected");
			if (t?.status === "rejected") throw t.reason;
		},
		onSettled: a
	}), u = (t.control?.actions || []).filter((e) => e !== "set_speed"), d = !!(t.control?.actions.includes("set_speed") && t.control.speed_mode), f = !I(t), p = c.isPending || c.isSuccess;
	if (!u.length && !d) return null;
	let h = (e) => {
		let r = {
			id: t.id,
			label: H(t),
			action: e,
			followups: f
		};
		if (e === "cancel") {
			if (i.current.cancel || i.current.confirmation || c.isSuccess) return;
			i.current.confirmation = !0, M({
				title: V(f ? "manage:taskControls.cancelFollowupsTitle" : "manage:taskControls.cancelTaskTitle", { task: H(t) }),
				body: f ? n.length > 1 ? V("manage:taskControls.cancelBatchFollowupsBody", { count: n.length }) : V("manage:taskControls.cancelFollowupsBody") : V("manage:taskControls.cancelTaskBody"),
				confirmLabel: V(f ? "manage:taskControls.cancelFollowups" : "manage:shared.cancelTask"),
				danger: !0,
				onConfirm: async () => (i.current.cancel = !0, await c.mutateAsync(r))
			}).finally(() => {
				i.current.confirmation = !1;
			});
		} else {
			if (i.current.change || i.current.cancel || p) return;
			i.current.change = !0, s.mutate(r);
		}
	};
	return /* @__PURE__ */ (0, J.jsxs)("div", {
		className: "ml-auto min-w-0",
		"data-task-controls": t.id,
		children: [/* @__PURE__ */ (0, J.jsxs)("div", {
			role: "group",
			"aria-label": V(f ? "manage:taskControls.followupsGroupLabel" : "manage:taskControls.groupLabel", { task: H(t) }),
			className: "flex flex-wrap items-center justify-end gap-2",
			children: [d ? /* @__PURE__ */ (0, J.jsx)(_, {
				value: t.control.speed_mode,
				busy: l.isPending || p,
				animate: t.control?.state === "running",
				onChange: (e) => l.mutate(e)
			}) : null, u.map((t) => {
				let n = (f ? He : Ve)[t], r = t === "cancel" ? c.isPending : s.isPending && s.variables?.action === t, i = t === "cancel" ? p : s.isPending || p;
				return /* @__PURE__ */ (0, J.jsx)(e, {
					type: "button",
					variant: "secondary",
					size: "small",
					iconOnly: !0,
					leadingIcon: Be[t],
					"aria-label": n,
					title: n,
					...A(r),
					"aria-disabled": i || void 0,
					onClick: () => h(t),
					"data-tooltip-copy-key": `tasks.control.action.${f ? "followups." : ""}${t}`
				}, t);
			})]
		}), l.error ? /* @__PURE__ */ (0, J.jsx)(m, {
			tone: "error",
			children: N(l.error)
		}) : null]
	});
}
// src/react/activity/task-icon.tsx
var Ge = new Map([
	[t, [
		"follow-check",
		"follow-resolve",
		"follow-creator",
		"follow-evidence-reclaim",
		"follow-backfill",
		"feed-check",
		"feed-scrape",
		"feed-cover"
	]],
	[b, [
		"library-processing",
		"organize",
		"batch",
		"resource-scan",
		"resource-apply",
		"seed-import"
	]],
	[ke, [
		"scrape-codes",
		"jav-discovery-metadata",
		"want-scrape",
		"upgrade-library"
	]],
	[f, [
		"scraping-cover",
		"jav-covers",
		"code-samples",
		"timeline-thumbnails",
		"entity-avatar",
		"cover-artwork-repair"
	]],
	[g, [
		"performer-profile",
		"performer-alias",
		"creator-identity",
		"studio-mark"
	]],
	[T, ["media-repair", "mp4-header-repair"]],
	[De, [
		"link-check",
		"link-prune",
		"source-check"
	]],
	[he, ["download-postprocess", "want-search"]],
	[d, ["taste-refresh"]],
	[v, [
		"upgrade-repairs",
		"diagnostic-export",
		"amane-bridge",
		"face-models",
		"ledger-backup",
		"ledger-restore"
	]]
].flatMap(([e, t]) => t.map((t) => [t, e])));
function Ke({ taskKey: e, className: t }) {
	let n = Ge.get(e) ?? x;
	return /* @__PURE__ */ (0, J.jsx)(n, {
		className: t,
		"aria-hidden": !0
	});
}
// src/react/activity/resource-chip.tsx
var qe = {
	blue: "bg-status-blue-text text-background-primary-default",
	purple: "bg-status-purple-text text-background-primary-default",
	cyan: "bg-status-cyan-text text-background-primary-default"
};
function Je({ color: e, high: t, ...r }) {
	return t ? /* @__PURE__ */ (0, J.jsx)("span", {
		...r,
		className: ne("inline-flex items-center justify-center rounded-md px-1.5 py-1 whitespace-nowrap text-caption-1-medium", qe[e])
	}) : /* @__PURE__ */ (0, J.jsx)(n, {
		variant: "caption",
		color: e,
		...r
	});
}
// src/react/activity/task-resources.tsx
var Ye = {
	cpu: {
		name: "CPU",
		color: "blue"
	},
	gpu: {
		name: "GPU",
		color: "purple"
	},
	network: {
		name: V("manage:taskResources.network"),
		color: "cyan"
	}
};
function Xe(e) {
	return e.state === "sampling" ? V("manage:taskResources.sampling") : e.via === "cloud" ? V("manage:taskResources.viaCloudDrive") : V("manage:taskResources.unavailable");
}
function Ze(e, t) {
	return t === 0 ? V("manage:taskResources.idle") : e === "network" ? `${ae(t)}/s` : `${t.toLocaleString(de, { maximumFractionDigits: 1 })}%`;
}
function Qe({ run: e, active: t = I(e) || !!e.control }) {
	if (!t || !e.resources) return null;
	let n = e.resources;
	return /* @__PURE__ */ (0, J.jsx)("div", {
		"data-task-resources": e.id,
		className: "flex min-w-0 flex-wrap items-center gap-2",
		children: [
			"cpu",
			"gpu",
			"network"
		].map((e) => {
			let t = n[e], r = Ye[e], i = e === "network" ? n.network.bytes_per_second : n[e].percent, a = t.state === "ready" && i !== null, o = a && t.high, s = a ? Ze(e, i) : Xe(t), c = [t.reason ? j(t, "reason") : "", o ? V("manage:taskResources.highUsage") : ""].filter(Boolean).join("\n");
			return /* @__PURE__ */ (0, J.jsxs)(Je, {
				color: r.color,
				high: o,
				tabIndex: c ? 0 : void 0,
				title: c || void 0,
				"data-task-resource": e,
				"data-resource-state": t.state,
				"data-resource-via": t.via,
				"data-resource-high": o || void 0,
				"data-resource-idle": a && i === 0 || void 0,
				"data-copy-ignore": "",
				children: [
					r.name,
					" ",
					s
				]
			}, e);
		})
	});
}
// src/react/activity/activity-page.tsx
var $e = K(ge), et = (e) => K(() => e ? y : !1), tt = /* @__PURE__ */ new Set(["upgrade-repairs"]), nt = /* @__PURE__ */ new Set(["asset_id", "name"]), rt = {
	succeeded: "lime",
	failed: "rose",
	cancelled: "rose",
	interrupted: "yellow",
	running: "blue",
	pending: "neutral"
}, it = {
	running: V("manage:taskStatus.running"),
	pausing: V("manage:taskStatus.pausing"),
	paused: V("manage:taskStatus.paused"),
	cancelling: V("manage:taskStatus.canceling")
};
function X({ run: e }) {
	let t = e.control?.state;
	if (t && (t !== "running" || !I(e))) return /* @__PURE__ */ (0, J.jsx)(n, {
		color: t === "running" ? "blue" : "neutral",
		children: /* @__PURE__ */ (0, J.jsx)("span", {
			"data-copy-key": `tasks.control.state.${t}`,
			children: it[t]
		})
	});
	let r = e.status === "failed" && e.task_key === "library-processing" && e.result_summary?.outcome === "partial", i = r || e.status === "succeeded" && F(e);
	return /* @__PURE__ */ (0, J.jsx)(n, {
		color: i ? "yellow" : rt[e.status] ?? "neutral",
		children: r ? V("manage:taskStatus.partial") : i ? V("manage:taskStatus.issuesFound") : e.status === "interrupted" && e.error_code === "taskRun.error.interruptedByUser" ? V("manage:taskStatus.interrupted") : Ce(e.status)
	});
}
function at({ rows: e }) {
	let [t, n] = (0, q.useState)({
		pageIndex: 0,
		pageSize: 20
	}), { pageSize: a } = t, o = Math.min(t.pageIndex, Math.max(0, Math.ceil(e.length / a) - 1));
	return /* @__PURE__ */ (0, J.jsxs)(J.Fragment, { children: [/* @__PURE__ */ (0, J.jsx)("ul", {
		className: "-mr-5 flex min-w-0 flex-col",
		children: e.slice(o * a, (o + 1) * a).map((e) => {
			let t = ce(e);
			return /* @__PURE__ */ (0, J.jsxs)("li", {
				"data-status": e.status,
				"data-followup-key": e.followup_key,
				className: "flex min-w-0 flex-col gap-1 border-t border-separator-border py-2.5 pr-10 pl-5",
				children: [
					/* @__PURE__ */ (0, J.jsxs)("div", {
						className: "flex min-w-0 flex-wrap items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, J.jsxs)("div", {
							className: "flex min-w-0 flex-1 basis-40 flex-wrap items-center gap-x-2 gap-y-1",
							children: [
								/* @__PURE__ */ (0, J.jsx)(Ke, {
									taskKey: e.task_key,
									className: "size-4 shrink-0 text-text-secondary"
								}),
								/* @__PURE__ */ (0, J.jsx)("span", {
									className: "min-w-0 break-words text-caption-1-regular text-text-primary",
									children: H(e)
								}),
								/* @__PURE__ */ (0, J.jsx)(X, { run: e }),
								t ? /* @__PURE__ */ (0, J.jsx)("span", {
									className: "min-w-0 break-words text-caption-1-regular text-text-secondary",
									children: t
								}) : null
							]
						}), /* @__PURE__ */ (0, J.jsx)(We, { run: e })]
					}),
					/* @__PURE__ */ (0, J.jsx)(Qe, { run: e }),
					Object.keys(e.result_summary || {}).length ? /* @__PURE__ */ (0, J.jsx)("div", {
						className: "w-full min-w-0",
						children: /* @__PURE__ */ (0, J.jsx)(i, {
							summary: V("manage:taskCenter.technicalDetails"),
							contentClassName: "pb-2.5",
							children: /* @__PURE__ */ (0, J.jsx)(Ae, {
								code: JSON.stringify(e.result_summary, null, 2),
								language: "json",
								label: V("manage:taskCenter.taskTechnicalDetails", { task: H(e) })
							})
						})
					}) : null
				]
			}, e.id);
		})
	}), /* @__PURE__ */ (0, J.jsx)(r, {
		label: V("manage:taskCenter.taskDetails"),
		total: e.length,
		pagination: {
			...t,
			pageIndex: o
		},
		onChange: n
	})] });
}
function Z({ run: e, meta: t, children: n, error: r, issues: a, followups: o, followupTotal: s = 0, badge: c, resourceActive: l, controlled: u }) {
	let [d, f] = (0, q.useState)(!!o?.some(I)), h = (u || [e]).map((e) => e.id), g = s > (o?.length || 0), _ = W({
		queryKey: [
			...S,
			"followups",
			h
		],
		enabled: d && g,
		queryFn: async ({ signal: e }) => (await Promise.all(h.map((t) => O(`/api/tasks/${t}`, e)))).flatMap((e) => e.followups),
		refetchInterval: et(l)
	}), v = (e) => e.status === "running" ? 3 : e.status === "pending" ? 2 : +(e.status === "failed" || e.status === "interrupted"), y = [...(g ? _.data : void 0) || o || []].sort((e, t) => v(t) - v(e) || t.id - e.id), b = y.length, x = Math.max(o?.length || 0, s), C = Ee(e), w = String(r || "").trim(), T = z(w);
	return /* @__PURE__ */ (0, J.jsxs)("li", {
		id: `run-${e.id}`,
		"data-status": e.status,
		"data-task-key": e.task_key,
		"data-run-id": e.id,
		className: ee({
			padding: "none",
			bordered: e.status === "failed" ? "error" : void 0,
			className: "flex flex-col"
		}),
		children: [
			/* @__PURE__ */ (0, J.jsxs)("div", {
				className: "flex flex-col gap-2 px-5 py-4",
				children: [
					/* @__PURE__ */ (0, J.jsxs)("div", {
						className: "flex min-w-0 flex-wrap items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, J.jsxs)("div", {
							className: "flex min-w-0 flex-1 basis-48 flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, J.jsx)(Ke, {
									taskKey: e.task_key,
									className: "size-5 shrink-0 text-text-secondary"
								}),
								/* @__PURE__ */ (0, J.jsx)("strong", {
									className: "min-w-0 break-words text-title-3-medium text-text-primary",
									children: H(e)
								}),
								c ?? /* @__PURE__ */ (0, J.jsx)(X, { run: e })
							]
						}), /* @__PURE__ */ (0, J.jsx)(We, {
							run: e,
							runs: u
						})]
					}),
					/* @__PURE__ */ (0, J.jsx)("p", {
						className: "text-caption-1-regular text-text-secondary",
						children: t
					}),
					/* @__PURE__ */ (0, J.jsx)(Qe, {
						run: e,
						active: l
					}),
					C ? /* @__PURE__ */ (0, J.jsx)(p, {
						href: C.href,
						"data-task-subject": e.id,
						title: C.label,
						className: "min-w-0 max-w-full self-start truncate text-text-primary",
						children: C.label
					}) : null,
					T ? /* @__PURE__ */ (0, J.jsx)("p", {
						"data-task-error": "",
						className: "text-caption-1-regular text-text-secondary wrap-anywhere",
						children: T
					}) : null,
					n
				]
			}),
			a ? /* @__PURE__ */ (0, J.jsx)("div", {
				className: "border-t border-separator-border",
				children: a
			}) : null,
			T && w !== T ? /* @__PURE__ */ (0, J.jsx)("div", {
				className: "border-t border-separator-border",
				children: /* @__PURE__ */ (0, J.jsx)(i, {
					row: !0,
					summary: V("manage:taskCenter.errorDetails"),
					contentClassName: "pb-5",
					children: /* @__PURE__ */ (0, J.jsx)(Me, {
						label: V("manage:taskCenter.taskErrorDetails", { task: H(e) }),
						children: w
					})
				})
			}) : null,
			x ? /* @__PURE__ */ (0, J.jsx)("div", {
				className: "border-t border-separator-border",
				children: /* @__PURE__ */ (0, J.jsxs)(i, {
					row: !0,
					summary: V("manage:taskCenter.taskDetailsCount", { count: x }),
					contentClassName: "pb-5",
					isOpen: d,
					onOpenChange: f,
					children: [
						_.error ? /* @__PURE__ */ (0, J.jsx)(m, {
							tone: "error",
							children: N(_.error)
						}) : null,
						b < x ? /* @__PURE__ */ (0, J.jsx)("p", {
							className: "text-caption-1-regular text-text-secondary",
							children: V("manage:taskCenter.showingCount", { count: b })
						}) : null,
						/* @__PURE__ */ (0, J.jsx)(at, { rows: y })
					]
				})
			}) : null,
			Object.keys(e.result_summary || {}).some((e) => !(C && nt.has(e))) ? /* @__PURE__ */ (0, J.jsx)("div", {
				className: "border-t border-separator-border",
				children: /* @__PURE__ */ (0, J.jsx)(i, {
					row: !0,
					summary: V("manage:taskCenter.technicalDetails"),
					contentClassName: "pb-5",
					children: /* @__PURE__ */ (0, J.jsx)(Ae, {
						code: JSON.stringify(e.result_summary, null, 2),
						language: "json",
						label: V("manage:taskCenter.taskTechnicalDetails", { task: H(e) })
					})
				})
			}) : null
		]
	});
}
function ot({ run: t, followups: n, followupTotal: r }) {
	let i = G(), a = U({
		mutationFn: () => k(`/api/tasks/${t.id}/interrupt`, {}),
		onSuccess: () => {
			i.invalidateQueries({ queryKey: S });
		}
	}), o = t.progress_total || 0, s = t.progress_current || 0, c = t.control?.state, l = c && c !== "running", u = l ? it[c] : ve(t) || V("manage:taskCenter.inProgress"), d = re(t.elapsed_seconds), f = [C[t.trigger] || t.trigger, d && V("manage:taskCenter.runningFor", { elapsed: d })].filter(Boolean).join(" · "), p = () => void M({
		title: `强制中断${t.task_label}`,
		body: "未完成的结果不会保存。外部请求可能稍后才自行结束，但它不能再改写这一轮任务记录。",
		confirmLabel: "强制中断",
		danger: !0,
		onConfirm: () => a.mutateAsync()
	});
	return /* @__PURE__ */ (0, J.jsxs)(Z, {
		run: t,
		meta: f,
		followups: n,
		followupTotal: r,
		children: [l && !(o > 0) ? /* @__PURE__ */ (0, J.jsx)("p", {
			"data-copy-key": `tasks.control.state.${c}`,
			className: "text-caption-1-regular text-text-secondary",
			children: u
		}) : /* @__PURE__ */ (0, J.jsx)(w, {
			embedded: !0,
			kind: D(t.task_key, String(t.progress_params?.stage || "") || null),
			label: o > 0 ? `${u} · ${V("manage:taskCenter.progressItems", { progress: R(s, o) })}` : u,
			value: Math.min(s, o),
			total: o
		}), /* @__PURE__ */ (0, J.jsx)(e, {
			variant: "danger",
			size: "small",
			className: "self-start",
			...A(a.isPending),
			onClick: p,
			children: "强制中断"
		})]
	});
}
function st({ run: e, followups: t, runs: r, latest: a, followupTotal: o, followupFailed: s = 0, followupCancelled: c = 0 }) {
	let d = !!(r && r.length > 1 && o), f = d ? [V("manage:taskCenter.processedTotal", { count: o }), s ? V("manage:taskCenter.failedCount", { count: s }) : ""].filter(Boolean) : we(Ee(e) ? {
		...e.result_summary,
		name: ""
	} : e.result_summary).filter((t) => t !== B(e) && t !== z(B(e))), p = Te(e), m = _e(e, a), h = re(e.elapsed_seconds), g = r && r.length > 1 ? r[r.length - 1] : void 0, _ = (g ? [
		C[e.trigger] || e.trigger,
		V("manage:taskCenter.lastRuns", { count: r.length }),
		`${L(g.finished_at)} – ${L(e.finished_at)}`
	] : [
		C[e.trigger] || e.trigger,
		L(e.finished_at),
		h && V("manage:taskCenter.took", { elapsed: h })
	]).filter(Boolean).join(" · ");
	return /* @__PURE__ */ (0, J.jsxs)(Z, {
		run: e,
		meta: _,
		error: B(e),
		followups: t,
		followupTotal: o,
		controlled: r,
		issues: p.length ? /* @__PURE__ */ (0, J.jsx)(i, {
			row: !0,
			summary: V("manage:taskCenter.issueDetailsCount", { count: p.length }),
			contentClassName: "pb-5",
			children: /* @__PURE__ */ (0, J.jsx)(Me, {
				label: V("manage:taskCenter.issueDetails"),
				children: /* @__PURE__ */ (0, J.jsx)("ul", {
					className: "flex min-w-0 flex-col whitespace-normal",
					"data-task-issues": "",
					children: p.map((e, t) => /* @__PURE__ */ (0, J.jsx)(l, {
						title: /* @__PURE__ */ (0, J.jsxs)(J.Fragment, { children: [e.label, e.provider || e.kind ? /* @__PURE__ */ (0, J.jsxs)("span", {
							className: "text-body-2-regular text-text-secondary",
							children: [" · ", [e.provider, e.kind].filter(Boolean).join(" · ")]
						}) : null] }),
						children: /* @__PURE__ */ (0, J.jsx)(Ne, {
							text: e.error,
							className: "text-caption-1-regular text-text-secondary"
						})
					}, `${e.source}-${t}`))
				})
			})
		}) : void 0,
		badge: c && e.status === "succeeded" ? /* @__PURE__ */ (0, J.jsx)(n, {
			color: "rose",
			children: /* @__PURE__ */ (0, J.jsx)("span", {
				"data-copy-key": `tasks.followups.cancelled.${c === o ? "all" : "partial"}`,
				children: V(c === o ? "manage:taskCenter.followupsCanceled" : "manage:taskCenter.someFollowupsCanceled")
			})
		}) : d && s ? /* @__PURE__ */ (0, J.jsx)(n, {
			color: "yellow",
			children: V("manage:taskStatus.issuesFound")
		}) : void 0,
		children: [
			c ? /* @__PURE__ */ (0, J.jsx)("p", {
				className: "text-caption-1-regular text-text-secondary",
				children: V("manage:taskCenter.followupsCanceledCount", { count: c })
			}) : null,
			f.length === 1 ? /* @__PURE__ */ (0, J.jsx)("p", {
				className: "text-caption-1-regular text-text-secondary wrap-anywhere",
				children: f[0]
			}) : f.length ? /* @__PURE__ */ (0, J.jsx)("ul", {
				className: "flex list-disc flex-col gap-1 pl-5 text-caption-1-regular text-text-secondary wrap-anywhere",
				children: f.map((e, t) => /* @__PURE__ */ (0, J.jsx)("li", { children: e }, t))
			}) : null,
			!p.length && F(e) && ["follow-check", "feed-check"].includes(e.task_key) ? /* @__PURE__ */ (0, J.jsx)("p", {
				className: "text-body-2-regular text-text-secondary",
				children: V("manage:taskCenter.noIssueDetails")
			}) : null,
			m ? /* @__PURE__ */ (0, J.jsx)(u, {
				href: m.href,
				size: "small",
				trailingIcon: ue,
				className: "self-start",
				children: m.label
			}) : null
		]
	});
}
function ct({ runs: e, followups: t, counts: r }) {
	let i = e[0], a = e[e.length - 1], o = P(r, e), s = Math.max(o.total, t.length), c = o.total ? o.settled : t.filter((e) => !I(e)).length, l = o.total ? o.failed : t.filter((e) => e.status === "failed" || e.status === "interrupted").length, u = [
		C[i.trigger] || i.trigger,
		e.length > 1 ? V("manage:taskCenter.batches", { count: e.length }) : "",
		V("manage:taskCenter.startedAt", { time: L(a.started_at || a.finished_at) })
	].filter(Boolean).join(" · ");
	return /* @__PURE__ */ (0, J.jsx)(Z, {
		run: i,
		meta: u,
		followups: t,
		followupTotal: s,
		resourceActive: !0,
		controlled: e,
		badge: i.control ? /* @__PURE__ */ (0, J.jsx)(X, { run: i }) : /* @__PURE__ */ (0, J.jsx)(n, {
			color: "blue",
			children: V("manage:taskStatus.running")
		}),
		children: /* @__PURE__ */ (0, J.jsx)(w, {
			embedded: !0,
			kind: D(i.task_key),
			value: c,
			total: s,
			label: `${V("manage:taskCenter.processedProgress", { progress: R(c, s) })}${l ? V("manage:taskCenter.failedSuffix", { count: l }) : ""}`
		})
	});
}
function Q({ title: e, children: t }) {
	let n = (0, q.useId)();
	return /* @__PURE__ */ (0, J.jsxs)("section", {
		"aria-labelledby": n,
		className: "flex min-w-0 flex-col gap-3",
		children: [/* @__PURE__ */ (0, J.jsx)("h3", {
			id: n,
			className: "text-title-2-medium text-text-primary",
			children: e
		}), t]
	});
}
function $({ live: e = !1, paginate: t = !0, children: n }) {
	let [i, a] = (0, q.useState)({
		pageIndex: 0,
		pageSize: 20
	}), o = q.Children.toArray(n), { pageSize: s } = i, c = Math.min(i.pageIndex, Math.max(0, Math.ceil(o.length / s) - 1));
	return /* @__PURE__ */ (0, J.jsxs)(J.Fragment, { children: [/* @__PURE__ */ (0, J.jsx)("ul", {
		"aria-live": e ? "polite" : void 0,
		className: "flex min-w-0 flex-col gap-3",
		children: t ? o.slice(c * s, (c + 1) * s) : o
	}), t ? /* @__PURE__ */ (0, J.jsx)(r, {
		label: V("manage:taskCenter.taskList"),
		total: o.length,
		pagination: {
			...i,
			pageIndex: c
		},
		onChange: a
	}) : null] });
}
function lt() {
	let [e, t] = (0, q.useState)(1), [n, i] = (0, q.useState)(20), s = W({
		queryKey: e === 1 && n === 20 ? S : [
			...S,
			"page",
			e,
			n
		],
		queryFn: ({ signal: t }) => ie(t, e, n),
		refetchInterval: $e,
		placeholderData: (e) => e
	}), [c, l] = (0, q.useState)(s.data);
	s.data && s.data !== c && l(s.data);
	let u = s.data || c, d = s.error ? N(s.error) : "";
	if (!u) return /* @__PURE__ */ (0, J.jsx)(je, { children: /* @__PURE__ */ (0, J.jsx)(m, {
		tone: "error",
		children: d || V("manage:taskCenter.loadFailed")
	}) });
	let f = u.finished || [], p = u.working_parents || [], h = [
		...u.running || [],
		...u.skipped || [],
		...f,
		...p
	], g = le(h), _ = new Set(h.map((e) => e.id)), v = (e) => e.filter((e) => !(e.followup_key && e.parent_run_id != null && _.has(e.parent_run_id))), y = v(f), b = u.followup_counts || {}, x = (e) => e.flatMap((e) => g.get(e.id) || []), C = [...y, ...v(p)].filter((e) => P(b, [e]).active > 0 || g.get(e.id)?.some(I)).sort((e, t) => t.id - e.id), w = v(u.running || []), T = v(u.skipped || []), E = y.filter((e) => !C.includes(e) && !T.some((t) => t.id === e.id)), D = (e) => (g.get(e.id) || []).every((e) => e.status === "succeeded" && !F(e)) && P(b, [e]).failed === 0, O = se(E, (e) => fe(e) && (D(e) || tt.has(e.task_key))), k = oe(C, (e) => e.control?.state || "").sort((e, t) => t.run.id - e.run.id), A = pe(h), ee = !w.length && !C.length && !T.length && !E.length;
	return /* @__PURE__ */ (0, J.jsxs)(je, { children: [
		d ? /* @__PURE__ */ (0, J.jsx)(m, {
			tone: "error",
			children: d
		}) : null,
		/* @__PURE__ */ (0, J.jsx)(Ue, {}),
		u.available === !1 ? /* @__PURE__ */ (0, J.jsx)(m, {
			tone: "warning",
			children: u.message || V("manage:taskCenter.tableNotReady")
		}) : null,
		/* @__PURE__ */ (0, J.jsx)(Re, {}),
		ee ? /* @__PURE__ */ (0, J.jsx)(o, {
			icon: Oe,
			title: V("manage:taskCenter.emptyTitle"),
			children: V("manage:taskCenter.emptyText")
		}) : /* @__PURE__ */ (0, J.jsxs)(J.Fragment, { children: [
			/* @__PURE__ */ (0, J.jsx)(Q, {
				title: V("manage:taskCenter.inProgress"),
				children: w.length || C.length ? /* @__PURE__ */ (0, J.jsxs)($, {
					live: !0,
					children: [w.map((e) => /* @__PURE__ */ (0, J.jsx)(ot, {
						run: e,
						followups: g.get(e.id),
						followupTotal: P(b, [e]).total
					}, e.id)), k.map(({ run: e, runs: t }) => /* @__PURE__ */ (0, J.jsx)(ct, {
						runs: t,
						followups: x(t),
						counts: b
					}, e.id))]
				}) : /* @__PURE__ */ (0, J.jsx)(m, {
					tone: "neutral",
					children: V("manage:taskCenter.noneRunning")
				})
			}),
			T.length ? /* @__PURE__ */ (0, J.jsx)(Q, {
				title: V("manage:taskCenter.skipped"),
				children: /* @__PURE__ */ (0, J.jsx)($, { children: T.map((e) => /* @__PURE__ */ (0, J.jsx)(st, {
					run: e,
					latest: A.has(e.id),
					followups: g.get(e.id)
				}, e.id)) })
			}) : null,
			E.length || u.finished_total ? /* @__PURE__ */ (0, J.jsxs)(Q, {
				title: V("manage:taskCenter.recentlyCompleted"),
				children: [E.length ? /* @__PURE__ */ (0, J.jsx)($, {
					paginate: !1,
					children: O.map(({ run: e, runs: t }) => {
						let n = P(b, t);
						return /* @__PURE__ */ (0, J.jsx)(st, {
							run: e,
							runs: t,
							latest: A.has(e.id),
							followups: x(t),
							followupTotal: n.total,
							followupFailed: n.failed,
							followupCancelled: n.cancelled
						}, e.id);
					})
				}) : null, /* @__PURE__ */ (0, J.jsx)(r, {
					label: V("manage:taskCenter.recentlyCompleted"),
					total: u.finished_total ?? y.length,
					unit: V("manage:taskCenter.footerUnit"),
					pageUnit: V("manage:taskCenter.footerPageUnit"),
					pagination: {
						pageIndex: (u.finished_page || e) - 1,
						pageSize: n
					},
					onChange: (r) => {
						r.pageIndex + 1 === e && r.pageSize === n ? s.refetch() : (t(r.pageIndex + 1), i(r.pageSize));
					}
				})]
			}) : null
		] }),
		/* @__PURE__ */ (0, J.jsx)(a, {})
	] });
}
export { lt as ActivityPage };

//# debugId=bd627e15-17d2-4546-b3eb-46b7a61a0af9