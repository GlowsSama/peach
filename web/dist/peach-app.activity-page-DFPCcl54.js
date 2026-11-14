(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "efce6acb-fca0-4c89-82fd-2490c3f4a048", e._sentryDebugIdIdentifier = "sentry-dbid-efce6acb-fca0-4c89-82fd-2490c3f4a048");
	} catch {}
})();
import { Button as e, Bx as t, Chip as n, DataTableFooter as r, Disclosure as i, DownloadsPanel as a, EmptyState as o, Gg as s, HN as c, IssueRow as l, LinkButton as u, Lo as d, Ma as f, NameLink as p, Note as m, OV as h, Pf as g, ProcessingMode as _, RB as v, RUNNING_POLL_MS as y, Rk as b, Su as x, TASKS_KEY as S, TRIGGER_LABELS as C, TaskProgress as w, Xl as T, __toESM as E, activityKind as D, apiGet as O, apiSend as k, busyProps as A, cardClass as ee, codedText as j, confirmModal as M, controlTask as te, cx as ne, elapsedText as N, errorMessage as P, fetchTasks as re, fmtSize as ie, foldByKind as ae, foldRoutine as oe, followupDetail as se, followupTally as F, groupFollowups as ce, hasResultProblems as I, i2 as le, interfaceLanguage as ue, isActive as L, isRoutine as de, latestOfKind as fe, momentText as R, notifyManager as pe, oe as me, pollInterval as he, problemDestination as ge, progressLabel as _e, progressText as z, readableErrorHeadline as B, replaceEqualDeep as ve, require_jsx_runtime as ye, require_react as be, runError as V, setTaskSpeed as xe, statusLabel as Se, summaryItems as Ce, t as H, taskIssues as we, taskName as U, taskSubject as Te, um as Ee, uo as De, useMutation as W, useQuery as G, useQueryClient as K, vl as Oe, withBackoff as ke } from "./peach-app.js";
import { CodeBlock as Ae } from "./peach-app.code-block-CXu10nIP.js";
import { Page as je } from "./peach-app.page-QAncjzM1.js";
import { ErrorDetails as Me, ErrorExcerpt as Ne } from "./peach-app.error-excerpt-Ugft6I5o.js";
// node_modules/@tanstack/react-query/build/modern/useMutationState.js
var q = /* @__PURE__ */ E(be(), 1);
function Pe() {
	let e;
	return (t, n) => {
		let r = [], i;
		return () => {
			let a = t.findAll(n.filters), o = a.flatMap((e) => [e, e.state]);
			return (!i || o.length !== r.length || o.some((e, t) => !Object.is(e, r[t]))) && (r = o, i = ve(e, a.map((e) => n.select ? n.select(e) : e.state)), e = i), i;
		};
	};
}
function Fe(e = {}, t) {
	let n = K(t).getMutationCache(), [r] = q.useState(() => Pe()), i = r(n, e);
	return q.useSyncExternalStore(q.useCallback((e) => n.subscribe(pe.batchCalls(e)), [n]), i, i);
}
// src/react/activity/background-issues.tsx
var J = ye(), Ie = ["background-issues"];
function Le() {
	let e = (0, q.useId)(), t = G({
		queryKey: Ie,
		queryFn: ({ signal: e }) => O("/api/background-issues", e),
		refetchInterval: 3e4
	}).data?.issues || [];
	return t.length ? /* @__PURE__ */ (0, J.jsxs)("section", {
		"aria-labelledby": e,
		className: "flex min-w-0 flex-col gap-3",
		children: [/* @__PURE__ */ (0, J.jsx)("h3", {
			id: e,
			className: "text-title-2-medium text-text-primary",
			children: H("manage:backgroundIssues.title")
		}), /* @__PURE__ */ (0, J.jsx)("ul", {
			className: "flex min-w-0 flex-col gap-3",
			children: t.map((e) => /* @__PURE__ */ (0, J.jsx)("li", { children: /* @__PURE__ */ (0, J.jsx)(Re, { issue: e }) }, e.key))
		})]
	}) : null;
}
function Re({ issue: t }) {
	let n = K(), r = W({
		mutationFn: () => k(t.retry, {}),
		onSuccess: () => {
			n.invalidateQueries({ queryKey: Ie });
		}
	}), i = t.since ? H("manage:backgroundIssues.since", { time: R(t.since) }) : H("manage:backgroundIssues.detectedAt", { time: R(t.noticed_at) });
	return /* @__PURE__ */ (0, J.jsx)(m, {
		tone: "error",
		title: j(t, "title"),
		action: /* @__PURE__ */ (0, J.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ (0, J.jsx)(u, {
				href: t.href,
				size: "small",
				trailingIcon: le,
				children: j(t, "link_label")
			}), t.retry ? /* @__PURE__ */ (0, J.jsx)(e, {
				variant: "secondary",
				size: "small",
				disabled: !t.retry_available,
				...A(r.isPending),
				onClick: () => r.mutate(),
				children: H("manage:shared.retryNow")
			}) : null]
		}),
		children: r.error ? H("manage:backgroundIssues.retryFailed", {
			moment: i,
			error: P(r.error)
		}) : i
	});
}
// src/react/activity/task-controls.tsx
var Y = ["task-control"], ze = {
	pause: h,
	resume: s,
	cancel: c
}, Be = {
	pause: H("manage:shared.pause"),
	resume: H("manage:shared.resume"),
	cancel: H("manage:taskControls.cancelTask")
}, Ve = {
	pause: H("manage:taskControls.pauseFollowups"),
	resume: H("manage:taskControls.resumeFollowups"),
	cancel: H("manage:taskControls.cancelFollowups")
};
function He() {
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
			title: H("manage:taskControls.actionFailed", {
				task: e.label,
				action: (e.followups ? Ve : Be)[e.action]
			}),
			children: P(t)
		}, e.id))
	}) : null;
}
function Ue({ run: t, runs: n = [t] }) {
	let r = K(), i = (0, q.useRef)({
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
	}, s = W({
		mutationKey: [
			...Y,
			t.id,
			"change"
		],
		mutationFn: o,
		onSettled: () => {
			i.current.change = !1, a();
		}
	}), c = W({
		mutationKey: [
			...Y,
			t.id,
			"cancel"
		],
		mutationFn: o,
		onSettled: () => {
			i.current.cancel = !1, a();
		}
	}), l = W({
		mutationFn: async (e) => {
			let t = (await Promise.allSettled(n.map((t) => xe(t.id, e)))).find((e) => e.status === "rejected");
			if (t?.status === "rejected") throw t.reason;
		},
		onSettled: a
	}), u = (t.control?.actions || []).filter((e) => e !== "set_speed"), d = !!(t.control?.actions.includes("set_speed") && t.control.speed_mode), f = !L(t), p = c.isPending || c.isSuccess;
	if (!u.length && !d) return null;
	let h = (e) => {
		let r = {
			id: t.id,
			label: U(t),
			action: e,
			followups: f
		};
		if (e === "cancel") {
			if (i.current.cancel || i.current.confirmation || c.isSuccess) return;
			i.current.confirmation = !0, M({
				title: H(f ? "manage:taskControls.cancelFollowupsTitle" : "manage:taskControls.cancelTaskTitle", { task: U(t) }),
				body: f ? n.length > 1 ? H("manage:taskControls.cancelBatchFollowupsBody", { count: n.length }) : H("manage:taskControls.cancelFollowupsBody") : H("manage:taskControls.cancelTaskBody"),
				confirmLabel: H(f ? "manage:taskControls.cancelFollowups" : "manage:shared.cancelTask"),
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
			"aria-label": H(f ? "manage:taskControls.followupsGroupLabel" : "manage:taskControls.groupLabel", { task: U(t) }),
			className: "flex flex-wrap items-center justify-end gap-2",
			children: [d ? /* @__PURE__ */ (0, J.jsx)(_, {
				value: t.control.speed_mode,
				busy: l.isPending || p,
				animate: t.control?.state === "running",
				onChange: (e) => l.mutate(e)
			}) : null, u.map((t) => {
				let n = (f ? Ve : Be)[t], r = t === "cancel" ? c.isPending : s.isPending && s.variables?.action === t, i = t === "cancel" ? p : s.isPending || p;
				return /* @__PURE__ */ (0, J.jsx)(e, {
					type: "button",
					variant: "secondary",
					size: "small",
					iconOnly: !0,
					leadingIcon: ze[t],
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
			children: P(l.error)
		}) : null]
	});
}
// src/react/activity/task-icon.tsx
var We = new Map([
	[t, [
		"follow-check",
		"follow-resolve",
		"follow-creator",
		"follow-evidence-reclaim",
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
	[Oe, [
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
		"entity-avatar"
	]],
	[g, [
		"performer-profile",
		"performer-alias",
		"creator-identity",
		"studio-mark"
	]],
	[T, ["media-repair", "mp4-header-repair"]],
	[Ee, [
		"link-check",
		"link-prune",
		"source-check"
	]],
	[me, ["download-postprocess", "want-search"]],
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
function Ge({ taskKey: e, className: t }) {
	let n = We.get(e) ?? x;
	return /* @__PURE__ */ (0, J.jsx)(n, {
		className: t,
		"aria-hidden": !0
	});
}
// src/react/activity/resource-chip.tsx
var Ke = {
	blue: "bg-status-blue-text text-background-primary-default",
	purple: "bg-status-purple-text text-background-primary-default",
	cyan: "bg-status-cyan-text text-background-primary-default"
};
function qe({ color: e, high: t, ...r }) {
	return t ? /* @__PURE__ */ (0, J.jsx)("span", {
		...r,
		className: ne("inline-flex items-center justify-center rounded-md px-1.5 py-1 whitespace-nowrap text-caption-1-medium", Ke[e])
	}) : /* @__PURE__ */ (0, J.jsx)(n, {
		variant: "caption",
		color: e,
		...r
	});
}
// src/react/activity/task-resources.tsx
var Je = {
	cpu: {
		name: "CPU",
		color: "blue"
	},
	gpu: {
		name: "GPU",
		color: "purple"
	},
	network: {
		name: H("manage:taskResources.network"),
		color: "cyan"
	}
};
function Ye(e) {
	return e.state === "sampling" ? H("manage:taskResources.sampling") : e.via === "cloud" ? H("manage:taskResources.viaCloudDrive") : H("manage:taskResources.unavailable");
}
function Xe(e, t) {
	return t === 0 ? H("manage:taskResources.idle") : e === "network" ? `${ie(t)}/s` : `${t.toLocaleString(ue, { maximumFractionDigits: 1 })}%`;
}
function Ze({ run: e, active: t = L(e) || !!e.control }) {
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
			let t = n[e], r = Je[e], i = e === "network" ? n.network.bytes_per_second : n[e].percent, a = t.state === "ready" && i !== null, o = a && t.high, s = a ? Xe(e, i) : Ye(t), c = [t.reason ? j(t, "reason") : "", o ? H("manage:taskResources.highUsage") : ""].filter(Boolean).join("\n");
			return /* @__PURE__ */ (0, J.jsxs)(qe, {
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
var Qe = ke(he), $e = (e) => ke(() => e ? y : !1), et = /* @__PURE__ */ new Set(["upgrade-repairs"]), tt = /* @__PURE__ */ new Set(["asset_id", "name"]), nt = {
	succeeded: "lime",
	failed: "rose",
	cancelled: "rose",
	interrupted: "yellow",
	running: "blue",
	pending: "neutral"
}, rt = {
	running: H("manage:taskStatus.running"),
	pausing: H("manage:taskStatus.pausing"),
	paused: H("manage:taskStatus.paused"),
	cancelling: H("manage:taskStatus.canceling")
};
function X({ run: e }) {
	let t = e.control?.state;
	if (t && (t !== "running" || !L(e))) return /* @__PURE__ */ (0, J.jsx)(n, {
		color: t === "running" ? "blue" : "neutral",
		children: /* @__PURE__ */ (0, J.jsx)("span", {
			"data-copy-key": `tasks.control.state.${t}`,
			children: rt[t]
		})
	});
	let r = e.status === "failed" && e.task_key === "library-processing" && e.result_summary?.outcome === "partial", i = r || e.status === "succeeded" && I(e);
	return /* @__PURE__ */ (0, J.jsx)(n, {
		color: i ? "yellow" : nt[e.status] ?? "neutral",
		children: r ? H("manage:taskStatus.partial") : i ? H("manage:taskStatus.issuesFound") : e.status === "interrupted" && e.error === "用户强制中断" ? H("manage:taskStatus.interrupted") : Se(e.status)
	});
}
function it({ rows: e }) {
	let [t, n] = (0, q.useState)({
		pageIndex: 0,
		pageSize: 20
	}), { pageSize: a } = t, o = Math.min(t.pageIndex, Math.max(0, Math.ceil(e.length / a) - 1));
	return /* @__PURE__ */ (0, J.jsxs)(J.Fragment, { children: [/* @__PURE__ */ (0, J.jsx)("ul", {
		className: "-mr-5 flex min-w-0 flex-col",
		children: e.slice(o * a, (o + 1) * a).map((e) => {
			let t = se(e);
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
								/* @__PURE__ */ (0, J.jsx)(Ge, {
									taskKey: e.task_key,
									className: "size-4 shrink-0 text-text-secondary"
								}),
								/* @__PURE__ */ (0, J.jsx)("span", {
									className: "min-w-0 break-words text-caption-1-regular text-text-primary",
									children: U(e)
								}),
								/* @__PURE__ */ (0, J.jsx)(X, { run: e }),
								t ? /* @__PURE__ */ (0, J.jsx)("span", {
									className: "min-w-0 break-words text-caption-1-regular text-text-secondary",
									children: t
								}) : null
							]
						}), /* @__PURE__ */ (0, J.jsx)(Ue, { run: e })]
					}),
					/* @__PURE__ */ (0, J.jsx)(Ze, { run: e }),
					Object.keys(e.result_summary || {}).length ? /* @__PURE__ */ (0, J.jsx)("div", {
						className: "w-full min-w-0",
						children: /* @__PURE__ */ (0, J.jsx)(i, {
							summary: H("manage:taskCenter.technicalDetails"),
							contentClassName: "pb-2.5",
							children: /* @__PURE__ */ (0, J.jsx)(Ae, {
								code: JSON.stringify(e.result_summary, null, 2),
								language: "json",
								label: H("manage:taskCenter.taskTechnicalDetails", { task: U(e) })
							})
						})
					}) : null
				]
			}, e.id);
		})
	}), /* @__PURE__ */ (0, J.jsx)(r, {
		label: H("manage:taskCenter.taskDetails"),
		total: e.length,
		pagination: {
			...t,
			pageIndex: o
		},
		onChange: n
	})] });
}
function Z({ run: e, meta: t, children: n, error: r, issues: a, followups: o, followupTotal: s = 0, badge: c, resourceActive: l, controlled: u }) {
	let [d, f] = (0, q.useState)(!!o?.some(L)), h = (u || [e]).map((e) => e.id), g = s > (o?.length || 0), _ = G({
		queryKey: [
			...S,
			"followups",
			h
		],
		enabled: d && g,
		queryFn: async ({ signal: e }) => (await Promise.all(h.map((t) => O(`/api/tasks/${t}`, e)))).flatMap((e) => e.followups),
		refetchInterval: $e(l)
	}), v = (e) => e.status === "running" ? 3 : e.status === "pending" ? 2 : +(e.status === "failed" || e.status === "interrupted"), y = [...(g ? _.data : void 0) || o || []].sort((e, t) => v(t) - v(e) || t.id - e.id), b = y.length, x = Math.max(o?.length || 0, s), C = Te(e), w = String(r || "").trim(), T = B(w);
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
								/* @__PURE__ */ (0, J.jsx)(Ge, {
									taskKey: e.task_key,
									className: "size-5 shrink-0 text-text-secondary"
								}),
								/* @__PURE__ */ (0, J.jsx)("strong", {
									className: "min-w-0 break-words text-title-3-medium text-text-primary",
									children: U(e)
								}),
								c ?? /* @__PURE__ */ (0, J.jsx)(X, { run: e })
							]
						}), /* @__PURE__ */ (0, J.jsx)(Ue, {
							run: e,
							runs: u
						})]
					}),
					/* @__PURE__ */ (0, J.jsx)("p", {
						className: "text-caption-1-regular text-text-secondary",
						children: t
					}),
					/* @__PURE__ */ (0, J.jsx)(Ze, {
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
					summary: H("manage:taskCenter.errorDetails"),
					contentClassName: "pb-5",
					children: /* @__PURE__ */ (0, J.jsx)(Me, {
						label: H("manage:taskCenter.taskErrorDetails", { task: U(e) }),
						children: w
					})
				})
			}) : null,
			x ? /* @__PURE__ */ (0, J.jsx)("div", {
				className: "border-t border-separator-border",
				children: /* @__PURE__ */ (0, J.jsxs)(i, {
					row: !0,
					summary: H("manage:taskCenter.taskDetailsCount", { count: x }),
					contentClassName: "pb-5",
					isOpen: d,
					onOpenChange: f,
					children: [
						_.error ? /* @__PURE__ */ (0, J.jsx)(m, {
							tone: "error",
							children: P(_.error)
						}) : null,
						b < x ? /* @__PURE__ */ (0, J.jsx)("p", {
							className: "text-caption-1-regular text-text-secondary",
							children: H("manage:taskCenter.showingCount", { count: b })
						}) : null,
						/* @__PURE__ */ (0, J.jsx)(it, { rows: y })
					]
				})
			}) : null,
			Object.keys(e.result_summary || {}).some((e) => !(C && tt.has(e))) ? /* @__PURE__ */ (0, J.jsx)("div", {
				className: "border-t border-separator-border",
				children: /* @__PURE__ */ (0, J.jsx)(i, {
					row: !0,
					summary: H("manage:taskCenter.technicalDetails"),
					contentClassName: "pb-5",
					children: /* @__PURE__ */ (0, J.jsx)(Ae, {
						code: JSON.stringify(e.result_summary, null, 2),
						language: "json",
						label: H("manage:taskCenter.taskTechnicalDetails", { task: U(e) })
					})
				})
			}) : null
		]
	});
}
function at({ run: t, followups: n, followupTotal: r }) {
	let i = K(), a = W({
		mutationFn: () => k(`/api/tasks/${t.id}/interrupt`, {}),
		onSuccess: () => {
			i.invalidateQueries({ queryKey: S });
		}
	}), o = t.progress_total || 0, s = t.progress_current || 0, c = t.control?.state, l = c && c !== "running", u = l ? rt[c] : _e(t) || H("manage:taskCenter.inProgress"), d = N(t.elapsed_seconds), f = [C[t.trigger] || t.trigger, d && H("manage:taskCenter.runningFor", { elapsed: d })].filter(Boolean).join(" · "), p = () => void M({
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
			label: o > 0 ? `${u} · ${H("manage:taskCenter.progressItems", { progress: z(s, o) })}` : u,
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
function ot({ run: e, followups: t, runs: r, latest: a, followupTotal: o, followupFailed: s = 0, followupCancelled: c = 0 }) {
	let d = !!(r && r.length > 1 && o), f = d ? [H("manage:taskCenter.processedTotal", { count: o }), s ? H("manage:taskCenter.failedCount", { count: s }) : ""].filter(Boolean) : Ce(Te(e) ? {
		...e.result_summary,
		name: ""
	} : e.result_summary).filter((t) => t !== V(e) && t !== B(V(e))), p = we(e), m = ge(e, a), h = N(e.elapsed_seconds), g = r && r.length > 1 ? r[r.length - 1] : void 0, _ = (g ? [
		C[e.trigger] || e.trigger,
		H("manage:taskCenter.lastRuns", { count: r.length }),
		`${R(g.finished_at)} – ${R(e.finished_at)}`
	] : [
		C[e.trigger] || e.trigger,
		R(e.finished_at),
		h && H("manage:taskCenter.took", { elapsed: h })
	]).filter(Boolean).join(" · ");
	return /* @__PURE__ */ (0, J.jsxs)(Z, {
		run: e,
		meta: _,
		error: V(e),
		followups: t,
		followupTotal: o,
		controlled: r,
		issues: p.length ? /* @__PURE__ */ (0, J.jsx)(i, {
			row: !0,
			summary: H("manage:taskCenter.issueDetailsCount", { count: p.length }),
			contentClassName: "pb-5",
			children: /* @__PURE__ */ (0, J.jsx)(Me, {
				label: H("manage:taskCenter.issueDetails"),
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
				children: H(c === o ? "manage:taskCenter.followupsCanceled" : "manage:taskCenter.someFollowupsCanceled")
			})
		}) : d && s ? /* @__PURE__ */ (0, J.jsx)(n, {
			color: "yellow",
			children: H("manage:taskStatus.issuesFound")
		}) : void 0,
		children: [
			c ? /* @__PURE__ */ (0, J.jsx)("p", {
				className: "text-caption-1-regular text-text-secondary",
				children: H("manage:taskCenter.followupsCanceledCount", { count: c })
			}) : null,
			f.length === 1 ? /* @__PURE__ */ (0, J.jsx)("p", {
				className: "text-caption-1-regular text-text-secondary wrap-anywhere",
				children: f[0]
			}) : f.length ? /* @__PURE__ */ (0, J.jsx)("ul", {
				className: "flex list-disc flex-col gap-1 pl-5 text-caption-1-regular text-text-secondary wrap-anywhere",
				children: f.map((e, t) => /* @__PURE__ */ (0, J.jsx)("li", { children: e }, t))
			}) : null,
			!p.length && I(e) && ["follow-check", "feed-check"].includes(e.task_key) ? /* @__PURE__ */ (0, J.jsx)("p", {
				className: "text-body-2-regular text-text-secondary",
				children: H("manage:taskCenter.noIssueDetails")
			}) : null,
			m ? /* @__PURE__ */ (0, J.jsx)(u, {
				href: m.href,
				size: "small",
				trailingIcon: le,
				className: "self-start",
				children: m.label
			}) : null
		]
	});
}
function st({ runs: e, followups: t, counts: r }) {
	let i = e[0], a = e[e.length - 1], o = F(r, e), s = Math.max(o.total, t.length), c = o.total ? o.settled : t.filter((e) => !L(e)).length, l = o.total ? o.failed : t.filter((e) => e.status === "failed" || e.status === "interrupted").length, u = [
		C[i.trigger] || i.trigger,
		e.length > 1 ? H("manage:taskCenter.batches", { count: e.length }) : "",
		H("manage:taskCenter.startedAt", { time: R(a.started_at || a.finished_at) })
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
			children: H("manage:taskStatus.running")
		}),
		children: /* @__PURE__ */ (0, J.jsx)(w, {
			embedded: !0,
			kind: D(i.task_key),
			value: c,
			total: s,
			label: `${H("manage:taskCenter.processedProgress", { progress: z(c, s) })}${l ? H("manage:taskCenter.failedSuffix", { count: l }) : ""}`
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
		label: H("manage:taskCenter.taskList"),
		total: o.length,
		pagination: {
			...i,
			pageIndex: c
		},
		onChange: a
	}) : null] });
}
function ct() {
	let [e, t] = (0, q.useState)(1), [n, i] = (0, q.useState)(20), s = G({
		queryKey: e === 1 && n === 20 ? S : [
			...S,
			"page",
			e,
			n
		],
		queryFn: ({ signal: t }) => re(t, e, n),
		refetchInterval: Qe,
		placeholderData: (e) => e
	}), [c, l] = (0, q.useState)(s.data);
	s.data && s.data !== c && l(s.data);
	let u = s.data || c, d = s.error ? P(s.error) : "";
	if (!u) return /* @__PURE__ */ (0, J.jsx)(je, { children: /* @__PURE__ */ (0, J.jsx)(m, {
		tone: "error",
		children: d || H("manage:taskCenter.loadFailed")
	}) });
	let f = u.finished || [], p = u.working_parents || [], h = [
		...u.running || [],
		...u.skipped || [],
		...f,
		...p
	], g = ce(h), _ = new Set(h.map((e) => e.id)), v = (e) => e.filter((e) => !(e.followup_key && e.parent_run_id != null && _.has(e.parent_run_id))), y = v(f), b = u.followup_counts || {}, x = (e) => e.flatMap((e) => g.get(e.id) || []), C = [...y, ...v(p)].filter((e) => F(b, [e]).active > 0 || g.get(e.id)?.some(L)).sort((e, t) => t.id - e.id), w = v(u.running || []), T = v(u.skipped || []), E = y.filter((e) => !C.includes(e) && !T.some((t) => t.id === e.id)), D = (e) => (g.get(e.id) || []).every((e) => e.status === "succeeded" && !I(e)) && F(b, [e]).failed === 0, O = oe(E, (e) => de(e) && (D(e) || et.has(e.task_key))), k = ae(C, (e) => e.control?.state || "").sort((e, t) => t.run.id - e.run.id), A = fe(h), ee = !w.length && !C.length && !T.length && !E.length;
	return /* @__PURE__ */ (0, J.jsxs)(je, { children: [
		d ? /* @__PURE__ */ (0, J.jsx)(m, {
			tone: "error",
			children: d
		}) : null,
		/* @__PURE__ */ (0, J.jsx)(He, {}),
		u.available === !1 ? /* @__PURE__ */ (0, J.jsx)(m, {
			tone: "warning",
			children: u.message || H("manage:taskCenter.tableNotReady")
		}) : null,
		/* @__PURE__ */ (0, J.jsx)(Le, {}),
		ee ? /* @__PURE__ */ (0, J.jsx)(o, {
			icon: De,
			title: H("manage:taskCenter.emptyTitle"),
			children: H("manage:taskCenter.emptyText")
		}) : /* @__PURE__ */ (0, J.jsxs)(J.Fragment, { children: [
			/* @__PURE__ */ (0, J.jsx)(Q, {
				title: H("manage:taskCenter.inProgress"),
				children: w.length || C.length ? /* @__PURE__ */ (0, J.jsxs)($, {
					live: !0,
					children: [w.map((e) => /* @__PURE__ */ (0, J.jsx)(at, {
						run: e,
						followups: g.get(e.id),
						followupTotal: F(b, [e]).total
					}, e.id)), k.map(({ run: e, runs: t }) => /* @__PURE__ */ (0, J.jsx)(st, {
						runs: t,
						followups: x(t),
						counts: b
					}, e.id))]
				}) : /* @__PURE__ */ (0, J.jsx)(m, {
					tone: "neutral",
					children: H("manage:taskCenter.noneRunning")
				})
			}),
			T.length ? /* @__PURE__ */ (0, J.jsx)(Q, {
				title: H("manage:taskCenter.skipped"),
				children: /* @__PURE__ */ (0, J.jsx)($, { children: T.map((e) => /* @__PURE__ */ (0, J.jsx)(ot, {
					run: e,
					latest: A.has(e.id),
					followups: g.get(e.id)
				}, e.id)) })
			}) : null,
			E.length || u.finished_total ? /* @__PURE__ */ (0, J.jsxs)(Q, {
				title: H("manage:taskCenter.recentlyCompleted"),
				children: [E.length ? /* @__PURE__ */ (0, J.jsx)($, {
					paginate: !1,
					children: O.map(({ run: e, runs: t }) => {
						let n = F(b, t);
						return /* @__PURE__ */ (0, J.jsx)(ot, {
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
					label: H("manage:taskCenter.recentlyCompleted"),
					total: u.finished_total ?? y.length,
					unit: H("manage:taskCenter.footerUnit"),
					pageUnit: H("manage:taskCenter.footerPageUnit"),
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
export { ct as ActivityPage };

//# debugId=efce6acb-fca0-4c89-82fd-2490c3f4a048