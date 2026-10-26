(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "6a70ea06-0f54-45ec-b21b-61753552d520", e._sentryDebugIdIdentifier = "sentry-dbid-6a70ea06-0f54-45ec-b21b-61753552d520");
	} catch {}
})();
import { createPaginatedRowModel as e } from "./peach-app.createPaginatedRowModel-ClHnhG_T.js";
import { $76d00c5a4edb230a$export$76ccd210b9029917 as t, $76d00c5a4edb230a$export$816b5d811295e6bc as n, $76d00c5a4edb230a$export$b59bdbef9ce70de2 as r, $76d00c5a4edb230a$export$f6f0c3fe4ec306ea as i, $76d00c5a4edb230a$export$f850895b287ef28e as ee, $ea3928288112382f$export$439d29a4e110a164 as a, Button as o, Bx as te, COLUMN_SORT as s, Checkbox as c, ChevronSortDown as ne, CollapseChevron as re, CollapseRegion as l, DataTableFooter as ie, DataTableFrame as ae, EmptyState as u, FOLLOW_CHECK_KEY as d, LAYOUTS as oe, M6 as se, Note as f, SORT_DEFAULT_DIR as ce, SORT_OPTIONS as le, Select as ue, SelectItem as de, SelectionDock as fe, SortDirectionIcon as pe, Switch as me, Table as he, TableColumnControls as ge, TableColumnResizer as _e, TableSelectionHeader as ve, TaskProgress as ye, Un as be, Wt as p, __toESM as m, authorGroups as xe, authorName as Se, busyProps as h, cardClass as Ce, checkEvidenceGap as we, checkFailures as Te, checkReceipt as Ee, checkSummary as De, checkedText as Oe, clickedBlank as ke, columnVisibilityFeature as Ae, confirmModal as g, createColumnHelper as je, dZ as _, dropSources as Me, du as Ne, errorHeadline as Pe, errorMessage as v, fetchCheckJob as Fe, fetchPending as Ie, flexRender as Le, isBroken as y, l7 as b, mapLimit as Re, markItem as ze, pageWindow as Be, patchSource as Ve, reloadFollowManage as He, removeSource as Ue, require_jsx_runtime as x, require_react as S, rowPaginationFeature as We, rowSelectionFeature as C, rowSortingFeature as Ge, selectionState as Ke, setSourceEnabled as qe, sortLabel as Je, startCheck as Ye, tableFeatures as w, tableRows as Xe, toggleGroup as T, useBackgroundJob as Ze, useMutation as E, useTable as Qe, useTablePreferences as $e } from "./peach-app.js";
import { AuthorAvatar as et, ErrorLine as tt, SourceIcon as D, SourceLink as nt, StatusBadge as rt } from "./peach-app.source-view-DalWfDkm.js";
// src/react/follow-manage/source-list.tsx
var O = /* @__PURE__ */ m(S(), 1), k = x(), it = w({
	rowPaginationFeature: We,
	rowSelectionFeature: C,
	rowSortingFeature: Ge,
	columnVisibilityFeature: Ae,
	paginatedRowModel: e()
}), A = (e) => (Number(e) || 0).toLocaleString();
function j({ group: e }) {
	let t = e.find((e) => e.biography || e.category || e.work_count || e.official_links?.length);
	return t ? /* @__PURE__ */ (0, k.jsxs)("div", {
		"data-follow-source-profile": "",
		className: "ml-11 flex min-w-0 flex-col gap-1.5 pb-2 pr-2 text-text-secondary max-sm:ml-9",
		children: [
			t.category || t.work_count ? /* @__PURE__ */ (0, k.jsxs)("div", {
				className: "flex flex-wrap items-center gap-x-3 gap-y-1 text-caption-1-regular",
				children: [t.category ? /* @__PURE__ */ (0, k.jsx)("span", { children: t.category }) : null, t.work_count ? /* @__PURE__ */ (0, k.jsxs)("span", { children: [A(t.work_count), " 套图"] }) : null]
			}) : null,
			t.biography ? /* @__PURE__ */ (0, k.jsx)("p", {
				className: "max-w-3xl text-body-2-regular wrap-anywhere",
				children: t.biography
			}) : null,
			t.official_links?.length ? /* @__PURE__ */ (0, k.jsx)("div", {
				className: "flex flex-wrap items-center gap-x-3 gap-y-1",
				children: t.official_links.map((e) => /* @__PURE__ */ (0, k.jsxs)("a", {
					href: e.url,
					target: "_blank",
					rel: "noopener noreferrer",
					className: "inline-flex items-center gap-0.5 text-caption-1-semibold text-text-primary underline-offset-2 hover:underline",
					children: [e.service, /* @__PURE__ */ (0, k.jsx)(p, {
						"aria-hidden": !0,
						className: "size-(--icon-inline)"
					})]
				}, e.url))
			}) : null
		]
	}) : null;
}
var at = Object.fromEntries(Object.entries(s).map(([e, t]) => [t, e])), M = 740;
function ot() {
	let [e, t] = (0, O.useState)(!1), n = (0, O.useRef)(null), r = (0, O.useCallback)((e) => {
		if (n.current?.disconnect(), !e) {
			n.current = null;
			return;
		}
		let r = new ResizeObserver(() => t(e.clientWidth < M));
		r.observe(e), n.current = r, t(e.clientWidth < M);
	}, []);
	return (0, O.useEffect)(() => () => n.current?.disconnect(), []), [r, e];
}
var st = {
	select: "选择",
	author: "创作者",
	source: "来源",
	provider: "站点",
	status: "状态",
	checked: "上次检查",
	actions: "操作"
}, ct = Object.entries(st).map(([e, t]) => ({
	id: e,
	label: t,
	width: e === "select" ? 48 : e === "source" ? 320 : e === "author" ? 240 : e === "actions" ? 208 : 184,
	min: e === "select" ? 48 : e === "actions" ? 200 : e === "source" ? 320 : 112,
	max: e === "select" ? 48 : e === "source" ? 2e3 : 800,
	flex: e === "source",
	required: e === "select" || e === "source"
}));
function lt({ source: e, selected: t, onToggle: n, handlers: r }) {
	return /* @__PURE__ */ (0, k.jsxs)("div", {
		"data-selected": t || void 0,
		"data-follow-source-row": "",
		className: "flex min-h-16 flex-wrap items-center gap-3 px-2 py-3 last:rounded-b-lg max-sm:gap-x-2",
		onClick: (e) => {
			ke(e, e.currentTarget) && n(!t);
		},
		children: [
			/* @__PURE__ */ (0, k.jsx)(c, {
				isSelected: t,
				onChange: n,
				"aria-label": `选择 ${e.label}`
			}),
			/* @__PURE__ */ (0, k.jsxs)("span", {
				className: "flex min-w-0 grow basis-0 items-center gap-1.5",
				children: [/* @__PURE__ */ (0, k.jsx)("span", {
					"data-follow-source-site": "",
					className: "flex shrink-0 items-center text-body-medium",
					children: /* @__PURE__ */ (0, k.jsx)(D, { provider: e.provider })
				}), /* @__PURE__ */ (0, k.jsx)(nt, { source: e })]
			}),
			/* @__PURE__ */ (0, k.jsx)(a, { children: e.provider_label }),
			/* @__PURE__ */ (0, k.jsx)(rt, { source: e }),
			e.last_error ? /* @__PURE__ */ (0, k.jsxs)("span", {
				"data-follow-source-error": "",
				className: "flex min-w-0 basis-full gap-3 max-sm:gap-x-2 sm:order-last",
				children: [/* @__PURE__ */ (0, k.jsx)("span", {
					"aria-hidden": !0,
					className: "w-4 shrink-0"
				}), /* @__PURE__ */ (0, k.jsxs)("span", {
					className: "flex min-w-0 grow gap-1.5",
					children: [/* @__PURE__ */ (0, k.jsx)("span", {
						"aria-hidden": !0,
						className: "w-(--icon-inline) shrink-0 text-body-medium"
					}), /* @__PURE__ */ (0, k.jsx)("span", {
						className: "min-w-0 grow",
						children: /* @__PURE__ */ (0, k.jsx)(tt, { text: e.last_error })
					})]
				})]
			}) : null,
			/* @__PURE__ */ (0, k.jsxs)("span", {
				"data-follow-source-controls": "",
				className: "flex w-max max-w-full flex-none flex-wrap items-center gap-1.5 max-sm:w-full",
				children: [
					/* @__PURE__ */ (0, k.jsx)("span", {
						className: "shrink-0 text-body-2-regular whitespace-nowrap text-text-secondary max-sm:mr-auto max-sm:text-caption-1-regular",
						children: Oe(e)
					}),
					/* @__PURE__ */ (0, k.jsx)(me, {
						"aria-label": `启用 ${e.label}`,
						isSelected: e.enabled,
						isDisabled: r.readOnly,
						onChange: (t) => r.toggle(e, t)
					}),
					/* @__PURE__ */ (0, k.jsxs)("span", {
						className: "flex shrink-0 items-center gap-1",
						children: [/* @__PURE__ */ (0, k.jsx)(o, {
							variant: "secondary",
							size: "small",
							iconOnly: !0,
							leadingIcon: _,
							"aria-label": `检查 ${e.label} 的更新`,
							disabled: !e.enabled || r.readOnly,
							...h(r.busy),
							onClick: () => r.check([e.id])
						}), /* @__PURE__ */ (0, k.jsx)(o, {
							variant: "secondary",
							size: "small",
							iconOnly: !0,
							leadingIcon: se,
							"aria-label": `移除 ${e.label}`,
							disabled: r.readOnly,
							onClick: () => r.remove(e)
						})]
					})
				]
			})
		]
	});
}
function ut({ group: e, name: t, open: n, selected: r, handlers: i, onOpen: ee, onToggleGroup: te, onToggle: s }) {
	let c = e.map((e) => e.id), ne = e.filter((e) => e.enabled).map((e) => e.id), ie = e.filter(y).length, ae = [...new Set(e.map((e) => e.provider_label || e.provider))].join("、"), u = `follow-author-${e[0].id}`, d = Ke(r, c);
	return /* @__PURE__ */ (0, k.jsxs)("section", {
		"aria-label": `${t} 的关注来源`,
		className: Ce({
			variant: "raised",
			padding: "none",
			className: "flex flex-col overflow-hidden p-2"
		}),
		children: [
			/* @__PURE__ */ (0, k.jsxs)("div", {
				"data-follow-author-header": !0,
				"data-open": n || void 0,
				className: "flex flex-wrap items-center gap-3 px-2 py-2.5",
				children: [
					/* @__PURE__ */ (0, k.jsx)(et, {
						group: e,
						name: t
					}),
					/* @__PURE__ */ (0, k.jsxs)("span", {
						className: "flex min-w-0 grow basis-0 flex-col gap-1",
						children: [/* @__PURE__ */ (0, k.jsx)("b", {
							className: "min-w-0 text-body-medium wrap-anywhere text-text-primary",
							children: t
						}), /* @__PURE__ */ (0, k.jsxs)("span", {
							"data-follow-author-sites": "",
							className: "flex min-w-0 flex-wrap items-center gap-1 text-body-2-regular",
							title: ae,
							children: [
								e.map((e) => /* @__PURE__ */ (0, k.jsx)(D, { provider: e.provider }, e.id)),
								/* @__PURE__ */ (0, k.jsx)(a, { children: `来源：${ae}` }),
								ie ? /* @__PURE__ */ (0, k.jsx)("span", {
									className: "ml-1 shrink-0 text-text-error-primary",
									children: `${ie} 个失败`
								}) : null
							]
						})]
					}),
					/* @__PURE__ */ (0, k.jsxs)("span", {
						"data-follow-author-controls": "",
						className: "flex flex-none items-center gap-2 max-sm:w-full max-sm:justify-end",
						children: [/* @__PURE__ */ (0, k.jsx)(o, {
							variant: "secondary",
							size: "small",
							iconOnly: !0,
							leadingIcon: _,
							"aria-label": `检查 ${t} 的全部来源`,
							disabled: !ne.length || i.readOnly,
							...h(i.busy),
							onClick: () => i.check(ne)
						}), /* @__PURE__ */ (0, k.jsxs)("span", {
							className: "flex flex-none items-center gap-2",
							children: [/* @__PURE__ */ (0, k.jsx)(o, {
								variant: "secondary",
								size: "small",
								leadingIcon: b,
								"aria-pressed": d.all ? "true" : d.some ? "mixed" : "false",
								"aria-label": `${d.all ? "取消全选" : "全选"} ${t} 的来源`,
								onClick: () => te(!d.all),
								children: d.all ? "取消全选" : "全选"
							}), /* @__PURE__ */ (0, k.jsx)(o, {
								variant: "secondary",
								size: "small",
								"aria-expanded": n,
								"aria-controls": u,
								leadingIcon: re,
								"aria-label": `${n ? "收起" : "展开"} ${t} 的来源`,
								onClick: () => ee(!n),
								children: n ? "收起" : "展开"
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, k.jsx)(j, { group: e }),
			/* @__PURE__ */ (0, k.jsx)(l, {
				id: u,
				open: n,
				"data-source-divider": !0,
				children: e.map((e) => /* @__PURE__ */ (0, k.jsx)(lt, {
					source: e,
					handlers: i,
					selected: r.has(e.id),
					onToggle: (t) => s(e.id, t)
				}, e.id))
			})
		]
	});
}
function N(e) {
	let { data: l, sort: p, dir: m, page: ke, layout: Ae, pageSize: y, selected: b, readOnly: x, onSort: S, onPage: We, onLayout: C, onPageSize: Ge, onSelected: w, toast: j, openFollow: M, onAdd: lt } = e, N = l.sources, P = (0, O.useMemo)(() => l.author_aliases || [], [l.author_aliases]), F = l.counts || {}, [dt, ft] = (0, O.useState)(/* @__PURE__ */ new Set()), [pt, mt] = ot(), [ht, I] = (0, O.useState)(""), L = (0, O.useMemo)(() => xe(N, p, m, P), [
		N,
		p,
		m,
		P
	]), gt = (0, O.useMemo)(() => Xe(L, p, m, P), [
		L,
		p,
		m,
		P
	]), { job: R, running: z, outcome: B, start: _t } = Ze({
		queryKey: d,
		queryFn: ({ signal: e }) => Fe(e),
		start: (e) => Ye(e),
		onError: (e) => I(v(e)),
		onFinish: (e) => {
			He(), j(e.status === "failed" ? e.error || "检查失败" : Ee(e));
		}
	}), V = (e) => {
		z || _t.isPending || (I(""), _t.mutate(e));
	}, vt = (e, t) => w(T(b, [e], t)), yt = (e, t) => w(T(b, e, t)), bt = E({
		mutationFn: (e) => Ue(e),
		onSuccess: (e, t) => {
			Me([t]), w(T(b, [t], !1)), j("已取消关注来源");
		},
		onError: (e) => I(v(e))
	}), xt = E({
		mutationFn: (e) => qe(e.id, e.enabled),
		onSuccess: (e, t) => {
			Ve(t.id, { enabled: t.enabled }), I("");
		},
		onError: (e) => I(v(e))
	}), St = (e) => void g({
		title: "取消关注来源",
		body: "将移除这个来源及已抓取的条目，媒体文件保留。",
		confirmLabel: "取消关注来源",
		danger: !0,
		onConfirm: () => bt.mutateAsync(e.id)
	}), H = E({
		mutationFn: async (e) => {
			let t = await Re(e.ids, 4, async (t) => {
				e.action === "remove" ? await Ue(t) : await qe(t, e.action === "enabled");
			});
			return {
				...e,
				done: e.ids.filter((e, n) => t[n]?.ok),
				results: t
			};
		},
		onSuccess: (e) => {
			if (e.action === "remove") Me(e.done);
			else for (let t of e.done) Ve(t, { enabled: e.action === "enabled" });
			w(T(b, e.done, !1));
			let t = e.results.filter((e) => !e.ok);
			if (t.length) {
				I(`${t.length}/${e.ids.length} 个来源未更新：${v(t[0]?.error)}`);
				return;
			}
			I("");
			let n = e.action === "remove" ? "删除" : e.action === "enabled" ? "启用" : "暂停";
			j(`已${n} ${e.done.length} 个关注来源`);
		},
		onError: (e) => I(v(e))
	}), U = E({
		mutationFn: async (e) => {
			let t = ((await Ie()).groups || []).flatMap((e) => [
				e.primary,
				...e.variants,
				...e.duplicates
			]).filter((e) => e.status === "new").map((e) => e.id);
			return {
				ids: t,
				failed: (await Re(t, 6, (t) => ze(t, e))).filter((e) => !e.ok)
			};
		},
		onSuccess: (e) => {
			He(), e.failed.length ? I(`批量更新 ${e.failed.length}/${e.ids.length} 项未完成`) : (I(""), j(`已批量标记 ${e.ids.length} 项`));
		},
		onError: (e) => I(v(e))
	}), Ct = (e, t) => xt.mutate({
		id: e.id,
		enabled: t
	}), W = (0, O.useRef)({
		check: V,
		toggle: Ct,
		remove: St,
		busy: !1,
		readOnly: x
	});
	W.current = {
		check: V,
		toggle: Ct,
		remove: St,
		busy: z || _t.isPending,
		readOnly: x
	};
	let G = W.current, wt = (0, O.useMemo)(() => {
		let e = je(), t = (e) => () => st[e] || e;
		return e.columns([
			e.display({
				id: "select",
				header: (e) => /* @__PURE__ */ (0, k.jsx)(ve, {
					table: e.table,
					label: "全选本页来源",
					page: !0
				}),
				cell: (e) => /* @__PURE__ */ (0, k.jsx)(c, {
					slot: null,
					isSelected: e.row.getIsSelected(),
					onChange: (t) => e.row.toggleSelected(t),
					"aria-label": `选择 ${e.row.original.source.label}`
				})
			}),
			e.accessor((e) => e.author, {
				id: "author",
				header: t("author"),
				cell: (e) => /* @__PURE__ */ (0, k.jsxs)("span", {
					className: "flex min-w-0 items-center gap-2",
					children: [/* @__PURE__ */ (0, k.jsx)(et, {
						group: e.row.original.group,
						name: e.row.original.author
					}), /* @__PURE__ */ (0, k.jsx)("span", {
						className: "min-w-0 break-words",
						children: e.row.original.author
					})]
				})
			}),
			e.accessor((e) => e.source.label, {
				id: "source",
				header: t("source"),
				cell: (e) => /* @__PURE__ */ (0, k.jsxs)("span", {
					className: "flex min-w-0 flex-col gap-0.5",
					children: [/* @__PURE__ */ (0, k.jsx)(nt, { source: e.row.original.source }), e.row.original.source.last_error ? /* @__PURE__ */ (0, k.jsx)(tt, { text: e.row.original.source.last_error }) : null]
				})
			}),
			e.accessor((e) => e.source.provider_label, {
				id: "provider",
				header: t("provider"),
				cell: (e) => /* @__PURE__ */ (0, k.jsxs)("span", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, k.jsx)(D, { provider: e.row.original.source.provider }), e.row.original.source.provider_label]
				})
			}),
			e.display({
				id: "status",
				header: t("status"),
				cell: (e) => /* @__PURE__ */ (0, k.jsx)(rt, { source: e.row.original.source })
			}),
			e.accessor((e) => e.source.last_checked_at || "", {
				id: "checked",
				header: t("checked"),
				cell: (e) => Oe(e.row.original.source)
			}),
			e.display({
				id: "actions",
				header: t("actions"),
				cell: (e) => /* @__PURE__ */ (0, k.jsxs)("span", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, k.jsx)(me, {
							"aria-label": `启用 ${e.row.original.source.label}`,
							isSelected: e.row.original.source.enabled,
							isDisabled: G.readOnly,
							onChange: (t) => W.current.toggle(e.row.original.source, t)
						}),
						/* @__PURE__ */ (0, k.jsx)(o, {
							variant: "secondary",
							size: "small",
							iconOnly: !0,
							leadingIcon: _,
							"aria-label": `检查 ${e.row.original.source.label} 的更新`,
							disabled: !e.row.original.source.enabled || G.readOnly,
							...h(G.busy),
							onClick: () => W.current.check([e.row.original.source.id])
						}),
						/* @__PURE__ */ (0, k.jsx)(o, {
							variant: "secondary",
							size: "small",
							iconOnly: !0,
							leadingIcon: se,
							"aria-label": `移除 ${e.row.original.source.label}`,
							disabled: G.readOnly,
							onClick: () => W.current.remove(e.row.original.source)
						})
					]
				})
			})
		]);
	}, [G]), K = (0, O.useMemo)(() => {
		let e = at[p];
		return e ? [{
			id: e,
			desc: m === "desc"
		}] : [];
	}, [p, m]), Tt = (0, O.useMemo)(() => Object.fromEntries([...b].map((e) => [String(e), !0])), [b]), q = Ae === "table", J = $e("follow-sources", ct), Y = Be(q ? gt.length : L.length, y, ke), X = Qe({
		features: it,
		data: gt,
		columns: wt,
		getRowId: (e) => String(e.source.id),
		state: {
			sorting: K,
			rowSelection: Tt,
			pagination: {
				pageIndex: Y.page - 1,
				pageSize: y
			},
			columnVisibility: J.visibility
		},
		onColumnVisibilityChange: J.change,
		manualSorting: !0,
		enableRowSelection: !0,
		onSortingChange: (e) => {
			let t = (typeof e == "function" ? e(K) : e)[0];
			if (!t) return;
			let n = s[t.id];
			n && S(n, t.desc ? "desc" : "asc");
		},
		onRowSelectionChange: (e) => {
			let t = typeof e == "function" ? e(Tt) : e;
			w(new Set(Object.entries(t).filter(([, e]) => e).map(([e]) => Number(e))));
		},
		onPaginationChange: (e) => {
			let t = {
				pageIndex: Y.page - 1,
				pageSize: y
			}, n = typeof e == "function" ? e(t) : e;
			n.pageSize === y ? n.pageIndex !== t.pageIndex && We(n.pageIndex + 1) : Ge(n.pageSize);
		}
	}), Et = X.getRowModel().rows, Dt = q ? Et.map((e) => e.original.source.id) : L.slice(Y.start, Y.end).flatMap((e) => e.map((e) => e.id)), Ot = Ke(b, Dt), Z = [...b], Q = Te(B), kt = N.filter((e) => e.enabled && (e.last_status === "error" || e.last_status === "unauthorized")).map((e) => e.id), At = we(B), $ = L.length > 0 && dt.size >= L.length;
	return N.length ? /* @__PURE__ */ (0, k.jsxs)("div", {
		className: Ce({
			padding: "none",
			className: "flex flex-col gap-4 px-6 py-5 max-sm:px-4"
		}),
		children: [
			/* @__PURE__ */ (0, k.jsxs)("div", {
				ref: pt,
				"data-follow-toolbar": "",
				"data-responsive-toolbar": "",
				children: [/* @__PURE__ */ (0, k.jsxs)("span", {
					"data-follow-toolbar-heading": "",
					"data-toolbar-heading": "",
					children: [/* @__PURE__ */ (0, k.jsx)("h3", {
						className: "text-title-2-medium text-text-primary",
						children: "关注列表"
					}), /* @__PURE__ */ (0, k.jsx)("span", {
						className: "text-body-2-regular text-text-secondary",
						children: `${N.length.toLocaleString()} 个来源${F.new ? ` · ${A(F.new)} 条未看` : ""}`
					})]
				}), /* @__PURE__ */ (0, k.jsxs)("div", {
					"data-follow-toolbar-actions": "",
					"data-toolbar-actions": "",
					children: [
						kt.length ? /* @__PURE__ */ (0, k.jsx)(o, {
							variant: "secondary",
							disabled: x,
							...h(G.busy),
							onClick: () => V(kt),
							children: "检查失败项"
						}) : null,
						/* @__PURE__ */ (0, k.jsx)(o, {
							variant: "primary",
							leadingIcon: _,
							disabled: x,
							"aria-label": "检查全部",
							iconOnly: mt,
							...h(G.busy),
							onClick: () => V([]),
							children: "检查全部"
						}),
						/* @__PURE__ */ (0, k.jsxs)("span", {
							"data-follow-toolbar-controls": "",
							className: "contents",
							children: [
								/* @__PURE__ */ (0, k.jsxs)("span", {
									"data-button-group": !0,
									role: "group",
									"aria-label": "关注列表版式",
									children: [/* @__PURE__ */ (0, k.jsx)(o, {
										variant: "ghost",
										iconOnly: !0,
										leadingIcon: be,
										"aria-label": oe[0][1],
										"aria-pressed": !q,
										onClick: () => C("default")
									}), /* @__PURE__ */ (0, k.jsx)(o, {
										variant: "ghost",
										iconOnly: !0,
										leadingIcon: Ne,
										"aria-label": oe[1][1],
										"aria-pressed": q,
										onClick: () => C("table")
									})]
								}),
								q ? /* @__PURE__ */ (0, k.jsx)(ge, {
									preferences: J,
									label: "关注来源"
								}) : null,
								/* @__PURE__ */ (0, k.jsxs)("span", {
									className: "flex flex-none items-center gap-2",
									children: [/* @__PURE__ */ (0, k.jsx)(ue, {
										"aria-label": "关注列表排序",
										prefix: "排序",
										selectedKey: p,
										onSelectionChange: (e) => {
											if (e === null) return;
											let t = String(e);
											S(t, ce[t]);
										},
										children: le.map(([e, t]) => /* @__PURE__ */ (0, k.jsx)(de, {
											id: e,
											children: t
										}, e))
									}), /* @__PURE__ */ (0, k.jsx)(o, {
										variant: "secondary",
										iconOnly: !0,
										leadingIcon: pe,
										"data-icon-state": m === "asc" ? "a" : "b",
										"aria-label": Je(p, m),
										onClick: () => S(p, m === "asc" ? "desc" : "asc")
									})]
								}),
								q ? null : /* @__PURE__ */ (0, k.jsx)(o, {
									variant: "secondary",
									iconOnly: mt,
									leadingIcon: re,
									"aria-expanded": !$,
									"aria-label": $ ? "全部展开" : "全部收起",
									onClick: () => ft($ ? /* @__PURE__ */ new Set() : new Set(L.map((e) => String(e[0].author_key || e[0].id)))),
									children: $ ? "全部展开" : "全部收起"
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, k.jsxs)("div", {
				"aria-live": "polite",
				className: "flex flex-col gap-3 empty:hidden",
				children: [
					z ? /* @__PURE__ */ (0, k.jsx)(ye, {
						embedded: !0,
						label: R?.message || (R?.total ? `${R.older ? "抓取历史" : "检查更新"}：已完成 ${R.checked || 0}/${R.total} 个来源` : "正在准备检查任务"),
						value: R?.checked,
						total: R?.total
					}) : null,
					ht ? /* @__PURE__ */ (0, k.jsx)(f, {
						tone: "error",
						title: "操作未完成",
						children: ht
					}) : null,
					!z && B?.results?.length ? /* @__PURE__ */ (0, k.jsx)(f, {
						tone: "neutral",
						title: "检查结果",
						children: De(B)
					}) : null,
					Q.length ? /* @__PURE__ */ (0, k.jsx)(f, {
						tone: "error",
						title: `${Q.length} 个来源检查失败`,
						extra: /* @__PURE__ */ (0, k.jsx)("ul", {
							className: "flex flex-col gap-0.5 text-body-2-regular",
							children: Q.map((e, t) => /* @__PURE__ */ (0, k.jsx)("li", { children: `${e.provider_label || e.provider || ""} ${e.author || e.label || e.ref || ""}：${Pe(e.error || "") || "未说明原因"}` }, `${e.provider || ""}-${e.ref || t}`))
						}),
						children: "这些来源这一轮没有取到更新。"
					}) : null,
					At ? /* @__PURE__ */ (0, k.jsx)(f, {
						tone: "warning",
						children: `条目已保存，但这次未保存来源的原始响应：${At}`
					}) : null
				]
			}),
			/* @__PURE__ */ (0, k.jsxs)(fe, {
				label: "关注来源批量操作",
				visible: Z.length > 0,
				count: `已选 ${Z.length} 个来源`,
				children: [
					/* @__PURE__ */ (0, k.jsx)(o, {
						variant: "secondary",
						size: "small",
						disabled: x,
						...h(G.busy),
						onClick: () => V(Z),
						children: "检查所选"
					}),
					/* @__PURE__ */ (0, k.jsx)(o, {
						variant: "secondary",
						size: "small",
						disabled: x,
						...h(H.isPending),
						onClick: () => H.mutate({
							ids: Z,
							action: "enabled"
						}),
						children: "启用"
					}),
					/* @__PURE__ */ (0, k.jsx)(o, {
						variant: "secondary",
						size: "small",
						disabled: x,
						...h(H.isPending),
						onClick: () => H.mutate({
							ids: Z,
							action: "paused"
						}),
						children: "暂停"
					}),
					/* @__PURE__ */ (0, k.jsx)(o, {
						variant: "danger",
						size: "small",
						disabled: x,
						...h(H.isPending),
						onClick: () => void g({
							title: `删除 ${Z.length} 个关注来源`,
							body: "将移除所选关注来源及其已抓取条目，媒体文件保留。",
							confirmLabel: "删除所选来源",
							danger: !0,
							onConfirm: () => H.mutateAsync({
								ids: Z,
								action: "remove"
							})
						}),
						children: "删除"
					}),
					/* @__PURE__ */ (0, k.jsx)(o, {
						variant: "ghost",
						size: "small",
						onClick: () => w(/* @__PURE__ */ new Set()),
						children: "取消选择"
					})
				]
			}),
			q ? /* @__PURE__ */ (0, k.jsx)(ae, {
				follow: !0,
				preferences: J,
				onRowClick: (e) => vt(Number(e), !b.has(Number(e))),
				children: /* @__PURE__ */ (0, k.jsxs)(he, {
					"aria-label": "关注来源",
					size: "sm",
					sortDescriptor: K[0] ? {
						column: K[0].id,
						direction: K[0].desc ? "descending" : "ascending"
					} : void 0,
					onSortChange: (e) => X.setSorting([{
						id: String(e.column),
						desc: e.direction === "descending"
					}]),
					children: [/* @__PURE__ */ (0, k.jsxs)(ee, { children: [X.getHeaderGroups()[0].headers.map((e) => {
						let t = e.column.id in s, r = Le(e.column.columnDef.header, e.getContext());
						return /* @__PURE__ */ (0, k.jsx)(n, {
							id: e.id,
							allowsSorting: t,
							isRowHeader: e.column.id === "source",
							...J.columnProps(e.id),
							children: ({ sortDirection: n }) => /* @__PURE__ */ (0, k.jsxs)(k.Fragment, { children: [e.id === "select" ? r : t ? /* @__PURE__ */ (0, k.jsxs)("span", {
								className: "flex items-center gap-0.5",
								children: [r, /* @__PURE__ */ (0, k.jsx)("span", {
									"data-sort-indicator": !0,
									"data-direction": n || void 0,
									children: /* @__PURE__ */ (0, k.jsx)(ne, {})
								})]
							}) : /* @__PURE__ */ (0, k.jsx)(a, { children: r }), /* @__PURE__ */ (0, k.jsx)(_e, {
								preferences: J,
								id: e.id
							})] })
						}, e.id);
					}), /* @__PURE__ */ (0, k.jsx)(n, {
						id: "remaining-space",
						"aria-label": "行空白区域",
						"data-table-space": "",
						width: J.spaceWidth,
						minWidth: 0
					})] }), /* @__PURE__ */ (0, k.jsx)(t, {
						renderEmptyState: () => "这一页没有来源",
						children: Et.map((e) => /* @__PURE__ */ (0, k.jsxs)(r, {
							id: e.id,
							"data-follow-selected": e.getIsSelected() || void 0,
							children: [e.getVisibleCells().map((e) => /* @__PURE__ */ (0, k.jsx)(i, { children: Le(e.column.columnDef.cell, e.getContext()) }, e.id)), /* @__PURE__ */ (0, k.jsx)(i, { "data-table-space": "" })]
						}, e.id))
					})]
				})
			}) : /* @__PURE__ */ (0, k.jsxs)(k.Fragment, { children: [/* @__PURE__ */ (0, k.jsx)(c, {
				isSelected: Ot.all,
				isIndeterminate: Ot.some,
				onChange: (e) => yt(Dt, e),
				"aria-label": "全选本页来源",
				children: "全选本页"
			}), /* @__PURE__ */ (0, k.jsx)("div", {
				className: "flex flex-col gap-3",
				children: L.slice(Y.start, Y.end).map((e) => {
					let t = String(e[0].author_key || e[0].id);
					return /* @__PURE__ */ (0, k.jsx)(ut, {
						group: e,
						name: Se(e, P),
						handlers: G,
						selected: b,
						open: !dt.has(t),
						onOpen: (e) => {
							let n = new Set(dt);
							e ? n.delete(t) : n.add(t), ft(n);
						},
						onToggleGroup: (t) => yt(e.map((e) => e.id), t),
						onToggle: vt
					}, t);
				})
			})] }),
			/* @__PURE__ */ (0, k.jsx)(ie, {
				label: "关注列表",
				total: Y.total,
				pagination: {
					pageIndex: Y.page - 1,
					pageSize: y
				},
				unit: q ? "个来源" : "位创作者",
				pageUnit: q ? "条" : "位",
				onChange: (e) => {
					e.pageSize === y ? X.setPageIndex(e.pageIndex) : X.setPageSize(e.pageSize);
				}
			}),
			F.new ? /* @__PURE__ */ (0, k.jsxs)("div", {
				className: "-mx-6 -mb-5 flex flex-wrap items-center gap-2 border-t border-separator-border rounded-b-2xl bg-card-footer px-6 py-4 max-sm:-mx-4 max-sm:px-4",
				children: [
					/* @__PURE__ */ (0, k.jsx)("span", {
						className: "mr-auto text-body-2-regular text-text-secondary",
						children: `未看 ${A(F.new)} · 已看 ${A(F.seen)} · 已保存 ${A(F.saved)} · 已忽略 ${A(F.ignored)}`
					}),
					/* @__PURE__ */ (0, k.jsx)(o, {
						variant: "secondary",
						size: "small",
						onClick: M,
						children: "去看更新"
					}),
					/* @__PURE__ */ (0, k.jsx)(o, {
						variant: "secondary",
						size: "small",
						disabled: x,
						...h(U.isPending),
						onClick: () => void g({
							title: "标记已看",
							body: "将把当前未看作品标记为已看。",
							confirmLabel: "标记已看",
							onConfirm: () => U.mutateAsync("seen")
						}),
						children: "全部标记已看"
					}),
					/* @__PURE__ */ (0, k.jsx)(o, {
						variant: "secondary",
						size: "small",
						disabled: x,
						...h(U.isPending),
						onClick: () => void g({
							title: "标记已忽略",
							body: "将把当前未看作品标记为已忽略。",
							confirmLabel: "标记已忽略",
							onConfirm: () => U.mutateAsync("ignored")
						}),
						children: "全部忽略"
					})
				]
			}) : null
		]
	}) : /* @__PURE__ */ (0, k.jsx)(u, {
		icon: te,
		title: "还没有关注来源",
		actions: /* @__PURE__ */ (0, k.jsx)(o, {
			variant: "primary",
			size: "small",
			onClick: lt,
			children: "添加关注"
		}),
		children: "关注来源及其检查状态会显示在这里。"
	});
}
export { N as SourceList };

//# debugId=6a70ea06-0f54-45ec-b21b-61753552d520