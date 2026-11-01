(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "cb50f9e3-7d1d-45c4-89a7-bf30071c9ed6", e._sentryDebugIdIdentifier = "sentry-dbid-cb50f9e3-7d1d-45c4-89a7-bf30071c9ed6");
	} catch {}
})();
import { Button as e, Chip as t, Disclosure as n, DownloadsPanel as r, EmptyState as i, Gg as a, HN as o, LinkButton as s, LoadingDots as c, Note as l, OV as u, Progress as d, TASKS_KEY as f, TRIGGER_LABELS as p, __toESM as m, apiGet as h, apiSend as g, busyProps as _, cardClass as v, confirmModal as y, controlTask as b, cx as x, elapsedText as S, errorMessage as C, f1 as ee, fetchEarlier as te, fetchTasks as ne, fmtSize as w, foldByKind as re, foldRoutine as ie, followupDetail as T, followupTally as E, groupFollowups as ae, hasResultProblems as D, i2 as O, isActive as k, isRoutine as oe, latestOfKind as se, mergeFinished as A, momentText as j, notifyManager as M, pollInterval as ce, problemDestination as N, progressText as P, replaceEqualDeep as F, require_jsx_runtime as I, require_react as L, statusLabel as R, summaryItems as z, taskIssues as B, uo as le, useMutation as V, useQuery as H, useQueryClient as U } from "./peach-app.js";
import { CodeBlock as W } from "./peach-app.code-block-CyDva4Ms.js";
import { Page as ue } from "./peach-app.page-QAncjzM1.js";
import { ErrorDetails as G, ErrorExcerpt as K } from "./peach-app.error-excerpt-B8v2xEIP.js";
// node_modules/@tanstack/react-query/build/modern/useMutationState.js
var q = /* @__PURE__ */ m(L(), 1);
function de() {
	let e;
	return (t, n) => {
		let r = [], i;
		return () => {
			let a = t.findAll(n.filters), o = a.flatMap((e) => [e, e.state]);
			return (!i || o.length !== r.length || o.some((e, t) => !Object.is(e, r[t]))) && (r = o, i = F(e, a.map((e) => n.select ? n.select(e) : e.state)), e = i), i;
		};
	};
}
function fe(e = {}, t) {
	let n = U(t).getMutationCache(), [r] = q.useState(() => de()), i = r(n, e);
	return q.useSyncExternalStore(q.useCallback((e) => n.subscribe(M.batchCalls(e)), [n]), i, i);
}
// src/react/activity/background-issues.tsx
var J = I(), pe = ["background-issues"];
function me() {
	let e = (0, q.useId)(), t = H({
		queryKey: pe,
		queryFn: ({ signal: e }) => h("/api/background-issues", e),
		refetchInterval: 3e4
	}).data?.issues || [];
	return t.length ? /* @__PURE__ */ (0, J.jsxs)("section", {
		"aria-labelledby": e,
		className: "flex min-w-0 flex-col gap-3",
		children: [/* @__PURE__ */ (0, J.jsx)("h3", {
			id: e,
			className: "text-title-2-medium text-text-primary",
			children: "需要处理"
		}), /* @__PURE__ */ (0, J.jsx)("ul", {
			className: "flex min-w-0 flex-col gap-3",
			children: t.map((e) => /* @__PURE__ */ (0, J.jsx)("li", { children: /* @__PURE__ */ (0, J.jsx)(he, { issue: e }) }, e.key))
		})]
	}) : null;
}
function he({ issue: t }) {
	let n = U(), r = V({
		mutationFn: () => g(t.retry, {}),
		onSuccess: () => {
			n.invalidateQueries({ queryKey: pe });
		}
	}), i = t.since ? `自 ${j(t.since)} 起` : `发现于 ${j(t.noticed_at)}`;
	return /* @__PURE__ */ (0, J.jsx)(l, {
		tone: "error",
		title: t.title,
		action: /* @__PURE__ */ (0, J.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ (0, J.jsx)(s, {
				href: t.href,
				size: "small",
				trailingIcon: O,
				children: t.link_label
			}), t.retry ? /* @__PURE__ */ (0, J.jsx)(e, {
				variant: "secondary",
				size: "small",
				disabled: !t.retry_available,
				..._(r.isPending),
				onClick: () => r.mutate(),
				children: "立即重试"
			}) : null]
		}),
		children: r.error ? `${i}\n没有重试：${C(r.error)}` : i
	});
}
// src/react/activity/task-controls.tsx
var Y = ["task-control"], ge = {
	pause: u,
	resume: a,
	cancel: o
}, _e = {
	pause: "暂停",
	resume: "继续",
	cancel: "取消"
}, ve = {
	pause: "暂停后续任务",
	resume: "继续后续任务",
	cancel: "取消后续任务"
};
function ye() {
	let e = fe({
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
		children: n.map(({ command: e, error: t }) => /* @__PURE__ */ (0, J.jsx)(l, {
			tone: "error",
			title: `${e.label}：${(e.followups ? ve : _e)[e.action]}未完成`,
			children: C(t)
		}, e.id))
	}) : null;
}
function be({ run: t }) {
	let n = U(), r = (0, q.useRef)({
		change: !1,
		cancel: !1,
		confirmation: !1
	}), i = () => {
		n.invalidateQueries({ queryKey: f });
	}, a = (e) => b(e.id, e.action), o = V({
		mutationKey: [
			...Y,
			t.id,
			"change"
		],
		mutationFn: a,
		onSettled: () => {
			r.current.change = !1, i();
		}
	}), s = V({
		mutationKey: [
			...Y,
			t.id,
			"cancel"
		],
		mutationFn: a,
		onSettled: () => {
			r.current.cancel = !1, i();
		}
	}), c = t.control?.actions || [], l = !k(t), u = s.isPending || s.isSuccess;
	if (!c.length) return null;
	let d = (e) => {
		let n = {
			id: t.id,
			label: t.task_label,
			action: e,
			followups: l
		};
		if (e === "cancel") {
			if (r.current.cancel || r.current.confirmation || s.isSuccess) return;
			r.current.confirmation = !0, y({
				title: l ? `取消「${t.task_label}」的全部后续任务` : `取消任务「${t.task_label}」`,
				body: l ? "将停止这轮已派出的全部后续任务，包括正在处理和排队的项目。已保存的资料和结果会保留。这批后续任务取消后不能继续，需要时重新发起。" : "将停止这轮剩余的处理及其后续任务。已保存的资料和结果会保留。这轮任务取消后不能继续，需要时重新发起。",
				confirmLabel: l ? "取消后续任务" : "取消任务",
				danger: !0,
				onConfirm: async () => (r.current.cancel = !0, await s.mutateAsync(n))
			}).finally(() => {
				r.current.confirmation = !1;
			});
		} else {
			if (r.current.change || r.current.cancel || u) return;
			r.current.change = !0, o.mutate(n);
		}
	};
	return /* @__PURE__ */ (0, J.jsx)("div", {
		className: "ml-auto shrink-0",
		"data-task-controls": t.id,
		children: /* @__PURE__ */ (0, J.jsx)("div", {
			role: "group",
			"aria-label": `${t.task_label}${l ? "后续任务" : "任务"}控制`,
			className: "flex items-center justify-end gap-2",
			children: c.map((t) => {
				let n = (l ? ve : _e)[t], r = t === "cancel" ? s.isPending : o.isPending && o.variables?.action === t, i = t === "cancel" ? u : o.isPending || u;
				return /* @__PURE__ */ (0, J.jsx)(e, {
					type: "button",
					variant: "secondary",
					size: "small",
					iconOnly: !0,
					leadingIcon: ge[t],
					"aria-label": n,
					title: n,
					..._(r),
					"aria-disabled": i || void 0,
					onClick: () => d(t),
					"data-tooltip-copy-key": `tasks.control.action.${l ? "followups." : ""}${t}`
				}, t);
			})
		})
	});
}
// src/react/activity/resource-chip.tsx
var xe = {
	blue: "bg-status-blue-text text-background-primary-default",
	purple: "bg-status-purple-text text-background-primary-default",
	cyan: "bg-status-cyan-text text-background-primary-default"
};
function Se({ color: e, high: n, ...r }) {
	return n ? /* @__PURE__ */ (0, J.jsx)("span", {
		...r,
		className: x("inline-flex items-center justify-center rounded-md px-1.5 py-1 whitespace-nowrap text-caption-1-medium", xe[e])
	}) : /* @__PURE__ */ (0, J.jsx)(t, {
		variant: "caption",
		color: e,
		...r
	});
}
// src/react/activity/task-resources.tsx
var Ce = {
	cpu: {
		name: "CPU",
		color: "blue",
		description: "CPU 使用率以执行端可用容量为 100%，容器按可见 CPU 配额计算。达到 50% 时加深显示。"
	},
	gpu: {
		name: "GPU",
		color: "purple",
		description: "GPU 使用率显示该任务最忙的 GPU 引擎。达到 50% 时加深显示。"
	},
	network: {
		name: "网络",
		color: "cyan",
		description: "网络速率显示该任务已观测的下载速度，达到 10 MiB/s 时加深显示。挂载盘或无法准确归属的传输显示未取得。"
	}
};
function we(e) {
	return e === "sampling" ? "采样中" : "未取得";
}
function Te({ run: e, active: t = k(e) || !!e.control }) {
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
			let t = n[e], r = Ce[e], i = e === "network" ? n.network.bytes_per_second : n[e].percent, a = t.state === "ready" && i !== null, o = a && t.high, s = a ? e === "network" ? `${w(i)}/s` : `${i.toLocaleString(void 0, { maximumFractionDigits: 1 })}%` : we(t.state), c = [
				t.reason,
				o ? "当前为高占用。" : "",
				r.description,
				n.detail
			].filter(Boolean).join("\n");
			return /* @__PURE__ */ (0, J.jsxs)(Se, {
				color: r.color,
				high: o,
				tabIndex: 0,
				title: c,
				"data-task-resource": e,
				"data-resource-state": t.state,
				"data-resource-high": o || void 0,
				"data-copy-ignore": "",
				"data-tooltip-copy-key": !t.reason && !n.detail && !o ? `tasks.resources.${e}.description` : void 0,
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
var Ee = 50, De = /* @__PURE__ */ new Set(["upgrade-repairs"]), Oe = {
	succeeded: "lime",
	failed: "rose",
	cancelled: "rose",
	interrupted: "yellow",
	running: "blue",
	pending: "neutral"
}, ke = {
	running: "进行中",
	pausing: "正在暂停",
	paused: "已暂停",
	cancelling: "正在取消"
};
function X({ run: e }) {
	let n = e.control?.state;
	if (n && (n !== "running" || !k(e))) return /* @__PURE__ */ (0, J.jsx)(t, {
		color: n === "running" ? "blue" : "neutral",
		children: /* @__PURE__ */ (0, J.jsx)("span", {
			"data-copy-key": `tasks.control.state.${n}`,
			children: ke[n]
		})
	});
	let r = e.status === "failed" && e.task_key === "library-processing" && e.result_summary?.outcome === "partial", i = r || e.status === "succeeded" && D(e);
	return /* @__PURE__ */ (0, J.jsx)(t, {
		color: i ? "yellow" : Oe[e.status] ?? "neutral",
		children: r ? "部分项目需处理" : i ? "发现问题" : e.status === "interrupted" && e.error === "用户强制中断" ? "已中断" : R(e.status)
	});
}
function Ae({ rows: e }) {
	return /* @__PURE__ */ (0, J.jsx)("ul", {
		className: "flex min-w-0 flex-col",
		children: e.map((e) => {
			let t = T(e);
			return /* @__PURE__ */ (0, J.jsxs)("li", {
				"data-status": e.status,
				"data-followup-key": e.followup_key,
				className: "flex min-w-0 flex-col gap-1 border-t border-separator-border px-5 py-2.5",
				children: [
					/* @__PURE__ */ (0, J.jsxs)("div", {
						className: "flex min-w-0 items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, J.jsxs)("div", {
							className: "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1",
							children: [
								/* @__PURE__ */ (0, J.jsx)("span", {
									className: "min-w-0 break-words text-caption-1-regular text-text-primary",
									children: e.task_label
								}),
								/* @__PURE__ */ (0, J.jsx)(X, { run: e }),
								t ? /* @__PURE__ */ (0, J.jsx)("span", {
									className: "min-w-0 break-words text-caption-1-regular text-text-secondary",
									children: t
								}) : null
							]
						}), /* @__PURE__ */ (0, J.jsx)(be, { run: e })]
					}),
					/* @__PURE__ */ (0, J.jsx)(Te, { run: e }),
					Object.keys(e.result_summary || {}).length ? /* @__PURE__ */ (0, J.jsx)("div", {
						className: "w-full min-w-0",
						children: /* @__PURE__ */ (0, J.jsx)(n, {
							summary: "技术详情",
							contentClassName: "pb-2.5",
							children: /* @__PURE__ */ (0, J.jsx)(W, {
								code: JSON.stringify(e.result_summary, null, 2),
								language: "json",
								label: `${e.task_label}技术详情`
							})
						})
					}) : null
				]
			}, e.id);
		})
	});
}
function Z({ run: e, meta: t, children: r, footer: i, followups: a, followupTotal: o = 0, badge: s, resourceActive: c }) {
	let l = (e) => e.status === "running" ? 3 : e.status === "pending" ? 2 : +(e.status === "failed" || e.status === "interrupted"), u = a ? [...a].sort((e, t) => l(t) - l(e) || t.id - e.id).slice(0, Ee) : [], d = u.length, f = Math.max(a?.length || 0, o);
	return /* @__PURE__ */ (0, J.jsxs)("li", {
		id: `run-${e.id}`,
		"data-status": e.status,
		"data-task-key": e.task_key,
		"data-run-id": e.id,
		className: v({
			padding: "none",
			bordered: "line",
			className: e.status === "failed" ? "flex flex-col border-border-error-default" : "flex flex-col"
		}),
		children: [
			/* @__PURE__ */ (0, J.jsxs)("div", {
				className: "flex flex-col gap-2 px-5 py-4",
				children: [
					/* @__PURE__ */ (0, J.jsxs)("div", {
						className: "flex min-w-0 items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, J.jsxs)("div", {
							className: "flex min-w-0 flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, J.jsx)("strong", {
								className: "min-w-0 break-words text-title-3-medium text-text-primary",
								children: e.task_label
							}), s ?? /* @__PURE__ */ (0, J.jsx)(X, { run: e })]
						}), /* @__PURE__ */ (0, J.jsx)(be, { run: e })]
					}),
					/* @__PURE__ */ (0, J.jsx)("p", {
						className: "text-caption-1-regular text-text-secondary",
						children: t
					}),
					/* @__PURE__ */ (0, J.jsx)(Te, {
						run: e,
						active: c
					}),
					r
				]
			}),
			d ? /* @__PURE__ */ (0, J.jsx)("div", {
				className: "border-t border-separator-border px-5 py-2.5",
				children: /* @__PURE__ */ (0, J.jsxs)(n, {
					summary: `任务明细 · ${f.toLocaleString()} 项`,
					contentClassName: "pb-2.5",
					defaultOpen: u.some((e) => k(e)),
					children: [d < f ? /* @__PURE__ */ (0, J.jsxs)("p", {
						className: "text-caption-1-regular text-text-secondary",
						children: [
							"列出其中 ",
							d.toLocaleString(),
							" 项，正在处理的排在前面"
						]
					}) : null, /* @__PURE__ */ (0, J.jsx)(Ae, { rows: u })]
				})
			}) : null,
			Object.keys(e.result_summary || {}).length ? /* @__PURE__ */ (0, J.jsx)("div", {
				className: "border-t border-separator-border px-5 py-2.5",
				children: /* @__PURE__ */ (0, J.jsx)(n, {
					summary: "技术详情",
					contentClassName: "pb-2.5",
					children: /* @__PURE__ */ (0, J.jsx)(W, {
						code: JSON.stringify(e.result_summary, null, 2),
						language: "json",
						label: `${e.task_label}技术详情`
					})
				})
			}) : null,
			i ? /* @__PURE__ */ (0, J.jsx)("div", {
				className: "flex min-h-14 flex-col justify-center rounded-b-2xl border-t border-separator-border bg-card-footer px-5 py-3",
				children: /* @__PURE__ */ (0, J.jsx)(K, {
					text: i,
					className: "text-caption-1-regular text-text-secondary"
				})
			}) : null
		]
	});
}
function je({ run: t, followups: n }) {
	let r = U(), i = V({
		mutationFn: () => g(`/api/tasks/${t.id}/interrupt`, {}),
		onSuccess: () => {
			r.invalidateQueries({ queryKey: f });
		}
	}), a = t.progress_total || 0, o = t.progress_current || 0, s = t.control?.state, l = s && s !== "running", u = l ? ke[s] : t.progress_label || "正在进行", m = S(t.elapsed_seconds), h = [p[t.trigger] || t.trigger, m && `已跑 ${m}`].filter(Boolean).join(" · "), v = () => void y({
		title: `强制中断${t.task_label}`,
		body: "未完成的结果不会保存。外部请求可能稍后才自行结束，但它不能再改写这一轮任务记录。",
		confirmLabel: "强制中断",
		danger: !0,
		onConfirm: () => i.mutateAsync()
	});
	return /* @__PURE__ */ (0, J.jsxs)(Z, {
		run: t,
		meta: h,
		followups: n,
		children: [a > 0 ? /* @__PURE__ */ (0, J.jsxs)("div", {
			className: "flex flex-col gap-1.5",
			children: [/* @__PURE__ */ (0, J.jsx)(d, {
				label: u,
				value: Math.min(o, a),
				max: a
			}), /* @__PURE__ */ (0, J.jsxs)("p", {
				className: "text-caption-1-regular text-text-secondary wrap-anywhere",
				children: [
					u,
					" · ",
					P(o, a),
					" 项"
				]
			})]
		}) : l ? /* @__PURE__ */ (0, J.jsx)("p", {
			"data-copy-key": `tasks.control.state.${s}`,
			className: "text-caption-1-regular text-text-secondary",
			children: u
		}) : /* @__PURE__ */ (0, J.jsx)(c, { label: u }), /* @__PURE__ */ (0, J.jsx)(e, {
			variant: "danger",
			size: "small",
			className: "self-start",
			..._(i.isPending),
			onClick: v,
			children: "强制中断"
		})]
	});
}
function Me({ run: e, followups: r, runs: i, latest: a, followupTotal: o, followupFailed: c = 0, followupCancelled: l = 0 }) {
	let u = !!(i && i.length > 1 && o), d = u ? [`共处理 ${o.toLocaleString()} 项`, c ? `其中 ${c.toLocaleString()} 项失败` : ""].filter(Boolean) : z(e.result_summary).filter((t) => t !== e.error), f = B(e), m = N(e, a), h = S(e.elapsed_seconds), g = i && i.length > 1 ? i[i.length - 1] : void 0, _ = (g ? [
		p[e.trigger] || e.trigger,
		`近 ${i.length} 轮`,
		`${j(g.finished_at)} – ${j(e.finished_at)}`
	] : [
		p[e.trigger] || e.trigger,
		j(e.finished_at),
		h && `用时 ${h}`
	]).filter(Boolean).join(" · ");
	return /* @__PURE__ */ (0, J.jsxs)(Z, {
		run: e,
		meta: _,
		footer: e.error,
		followups: r,
		followupTotal: o,
		badge: l && e.status === "succeeded" ? /* @__PURE__ */ (0, J.jsx)(t, {
			color: "rose",
			children: /* @__PURE__ */ (0, J.jsx)("span", {
				"data-copy-key": `tasks.followups.cancelled.${l === o ? "all" : "partial"}`,
				children: l === o ? "后续任务已取消" : "部分后续任务已取消"
			})
		}) : u && c ? /* @__PURE__ */ (0, J.jsx)(t, {
			color: "yellow",
			children: "发现问题"
		}) : void 0,
		children: [
			l ? /* @__PURE__ */ (0, J.jsxs)("p", {
				className: "text-caption-1-regular text-text-secondary",
				children: [
					"后续任务已取消 ",
					l.toLocaleString(),
					" 项"
				]
			}) : null,
			d.length === 1 ? /* @__PURE__ */ (0, J.jsx)("p", {
				className: "text-caption-1-regular text-text-secondary wrap-anywhere",
				children: d[0]
			}) : d.length ? /* @__PURE__ */ (0, J.jsx)("ul", {
				className: "flex list-disc flex-col gap-1 pl-5 text-caption-1-regular text-text-secondary wrap-anywhere",
				children: d.map((e, t) => /* @__PURE__ */ (0, J.jsx)("li", { children: e }, t))
			}) : null,
			f.length ? /* @__PURE__ */ (0, J.jsx)(n, {
				summary: `问题详情 · ${f.length} 项`,
				contentClassName: "pt-2",
				children: /* @__PURE__ */ (0, J.jsx)(G, {
					label: "任务问题详情",
					children: /* @__PURE__ */ (0, J.jsx)("ul", {
						className: "flex min-w-0 flex-col gap-3",
						"data-task-issues": "",
						children: f.map((e, t) => /* @__PURE__ */ (0, J.jsxs)("li", {
							className: "flex min-w-0 flex-col gap-1 text-body-2-regular wrap-anywhere",
							children: [/* @__PURE__ */ (0, J.jsx)("p", {
								className: "text-body-regular text-text-primary",
								children: [
									e.label,
									e.provider,
									e.kind
								].filter(Boolean).join(" · ")
							}), /* @__PURE__ */ (0, J.jsx)(K, {
								text: e.error,
								className: "text-text-primary"
							})]
						}, `${e.source}-${t}`))
					})
				})
			}) : D(e) && ["follow-check", "feed-check"].includes(e.task_key) ? /* @__PURE__ */ (0, J.jsx)("p", {
				className: "text-body-2-regular text-text-secondary",
				children: "未取得本轮逐项详情，可到来源列表查看检查结果。"
			}) : null,
			m ? /* @__PURE__ */ (0, J.jsx)(s, {
				href: m.href,
				size: "small",
				trailingIcon: O,
				className: "self-start",
				children: m.label
			}) : null
		]
	});
}
function Ne({ runs: e, followups: n, counts: r }) {
	let i = e[0], a = e[e.length - 1], o = E(r, e), s = Math.max(o.total, n.length), c = o.total ? o.settled : n.filter((e) => !k(e)).length, l = o.total ? o.failed : n.filter((e) => e.status === "failed" || e.status === "interrupted").length, u = [
		p[i.trigger] || i.trigger,
		e.length > 1 ? `${e.length} 批` : "",
		`${j(a.started_at || a.finished_at)} 开始`
	].filter(Boolean).join(" · ");
	return /* @__PURE__ */ (0, J.jsx)(Z, {
		run: i,
		meta: u,
		followups: n,
		followupTotal: s,
		resourceActive: !0,
		badge: i.control ? /* @__PURE__ */ (0, J.jsx)(X, { run: i }) : /* @__PURE__ */ (0, J.jsx)(t, {
			color: "blue",
			children: "进行中"
		}),
		children: /* @__PURE__ */ (0, J.jsxs)("div", {
			className: "flex flex-col gap-1.5",
			children: [/* @__PURE__ */ (0, J.jsx)(d, {
				label: `${i.task_label}进度`,
				value: c,
				max: s
			}), /* @__PURE__ */ (0, J.jsxs)("p", {
				className: "text-caption-1-regular text-text-secondary",
				children: [
					"已处理 ",
					P(c, s),
					" 项",
					l ? ` · 其中 ${l.toLocaleString()} 项失败` : ""
				]
			})]
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
function $({ live: e = !1, children: t }) {
	return /* @__PURE__ */ (0, J.jsx)("ul", {
		"aria-live": e ? "polite" : void 0,
		className: "flex min-w-0 flex-col gap-3",
		children: t
	});
}
function Pe() {
	let t = H({
		queryKey: f,
		queryFn: ({ signal: e }) => ne(e),
		refetchInterval: (e) => ce(e.state.data)
	}), n = t.data, a = n?.finished, [o, s] = (0, q.useState)([]), [c, u] = (0, q.useState)(!1), [d, p] = (0, q.useState)({}), [m, h] = (0, q.useState)(a);
	a !== m && (h(a), o.length && m && s(A(o, m)));
	let g = V({
		mutationFn: ({ oldest: e }) => te(e),
		onSuccess: (e, { shown: t }) => {
			s((n) => A(n, t, e.finished || [])), u(!!e.finished_has_more), p((t) => ({
				...t,
				...e.followup_counts
			}));
		}
	}), v = t.error ? C(t.error) : "";
	if (!n) return /* @__PURE__ */ (0, J.jsx)(ue, { children: /* @__PURE__ */ (0, J.jsx)(l, {
		tone: "error",
		children: v || "读取任务中心失败"
	}) });
	let y = A(n.finished || [], o), b = n.working_parents || [], x = [
		...n.running || [],
		...n.skipped || [],
		...y,
		...b
	], S = ae(x), w = new Set(x.map((e) => e.id)), T = (e) => e.filter((e) => !(e.followup_key && e.parent_run_id != null && w.has(e.parent_run_id))), O = T(y), j = O[O.length - 1], M = !!j && (o.length ? c : !!n.finished_has_more), N = () => {
		!g.isPending && j && g.mutate({
			oldest: j,
			shown: y
		});
	}, P = {
		...d,
		...n.followup_counts
	}, F = (e) => e.flatMap((e) => S.get(e.id) || []), I = [...O, ...T(b)].filter((e) => E(P, [e]).active > 0 || S.get(e.id)?.some(k)).sort((e, t) => t.id - e.id), L = T(n.running || []), R = T(n.skipped || []), z = O.filter((e) => !I.includes(e) && !R.some((t) => t.id === e.id)), B = (e) => (S.get(e.id) || []).every((e) => e.status === "succeeded" && !D(e)) && E(P, [e]).failed === 0, U = ie(z, (e) => oe(e) && (B(e) || De.has(e.task_key))), W = [...re(I.filter((e) => !e.control)), ...I.filter((e) => e.control).map((e) => ({
		run: e,
		runs: [e]
	}))].sort((e, t) => t.run.id - e.run.id), G = se(x), K = !L.length && !I.length && !R.length && !z.length;
	return /* @__PURE__ */ (0, J.jsxs)(ue, { children: [
		v ? /* @__PURE__ */ (0, J.jsx)(l, {
			tone: "error",
			children: v
		}) : null,
		/* @__PURE__ */ (0, J.jsx)(ye, {}),
		n.available === !1 ? /* @__PURE__ */ (0, J.jsx)(l, {
			tone: "warning",
			children: n.message || "数据库尚未准备好任务记录表"
		}) : null,
		/* @__PURE__ */ (0, J.jsx)(me, {}),
		K ? /* @__PURE__ */ (0, J.jsx)(i, {
			icon: le,
			title: "还没有任务记录",
			children: "扫描、追更检查、批量操作和命令行批处理跑起来之后，这里会显示它们的进度与结果。"
		}) : /* @__PURE__ */ (0, J.jsxs)(J.Fragment, { children: [
			/* @__PURE__ */ (0, J.jsx)(Q, {
				title: "正在进行",
				children: L.length || I.length ? /* @__PURE__ */ (0, J.jsxs)($, {
					live: !0,
					children: [L.map((e) => /* @__PURE__ */ (0, J.jsx)(je, {
						run: e,
						followups: S.get(e.id)
					}, e.id)), W.map(({ run: e, runs: t }) => /* @__PURE__ */ (0, J.jsx)(Ne, {
						runs: t,
						followups: F(t),
						counts: P
					}, e.id))]
				}) : /* @__PURE__ */ (0, J.jsx)(l, {
					tone: "neutral",
					children: "没有任务在跑。"
				})
			}),
			R.length ? /* @__PURE__ */ (0, J.jsx)(Q, {
				title: "本次未执行",
				children: /* @__PURE__ */ (0, J.jsx)($, { children: R.map((e) => /* @__PURE__ */ (0, J.jsx)(Me, {
					run: e,
					latest: G.has(e.id),
					followups: S.get(e.id)
				}, e.id)) })
			}) : null,
			z.length || M ? /* @__PURE__ */ (0, J.jsxs)(Q, {
				title: "最近完成",
				children: [
					z.length ? /* @__PURE__ */ (0, J.jsx)($, { children: U.map(({ run: e, runs: t }) => {
						let n = E(P, t);
						return /* @__PURE__ */ (0, J.jsx)(Me, {
							run: e,
							runs: t,
							latest: G.has(e.id),
							followups: F(t),
							followupTotal: n.total,
							followupFailed: n.failed,
							followupCancelled: n.cancelled
						}, e.id);
					}) }) : null,
					g.error ? /* @__PURE__ */ (0, J.jsx)(l, {
						tone: "error",
						children: C(g.error)
					}) : null,
					M ? /* @__PURE__ */ (0, J.jsx)(e, {
						variant: "secondary",
						size: "small",
						leadingIcon: ee,
						className: "self-start",
						..._(g.isPending),
						onClick: N,
						children: "加载更早"
					}) : null
				]
			}) : null
		] }),
		/* @__PURE__ */ (0, J.jsx)(r, {})
	] });
}
export { Pe as ActivityPage };

//# debugId=cb50f9e3-7d1d-45c4-89a7-bf30071c9ed6