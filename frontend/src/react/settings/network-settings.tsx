/* 「网络与访问」分组：本机端口、Peach 代理、访问密码与公网入口。 */
import { useState, type FormEvent } from 'react';

import { SettingsRow } from '@/components/application/settings/settings-rows';
import { Button } from '@/components/base/buttons/button';
import { Input } from '@/components/base/input/input';
import { Switch } from '@/components/base/switch/switch';

import { apiSend } from '../../api';
import type {
  ConfigurationGroupProps, PeachProxyState, XChinaFlareSolverrState,
} from '../bundle';
import { Note } from '../components/note';
import { AccessSettings } from './access-settings';
import { groupRoot } from './configuration-panel';
import { PortSettings } from './port-settings';
import { ProxyAddressField, ProxyModeSelect } from './peach-proxy-fields';
import { TunnelSettings } from './tunnel-settings';
import { ErrorText, Footer, Rows, Section, Stack } from './section';
import { busyProps, useAction } from './use-action';

export function NetworkSettings({ data, receipt, panel, issues }: ConfigurationGroupProps) {
  return (
    <div {...groupRoot(panel)}>
      {issues}
      {data.network || (data.editable && data.port_editable !== false && !data.section_errors?.media_sources)
        ? <PortSettings data={data} receipt={receipt} /> : null}
      {data.access ? <AccessSettings initial={data.access} receipt={receipt} /> : null}
      {data.tunnel ? <TunnelSettings revision={data.revision} initial={data.tunnel} receipt={receipt} /> : null}
      {data.peach_proxy ? <PeachProxy initial={data.peach_proxy} receipt={receipt} /> : null}
      {data.network?.xchina_flaresolverr
        ? <XChinaFlareSolverr initial={data.network.xchina_flaresolverr} receipt={receipt} /> : null}
    </div>
  );
}

export function XChinaFlareSolverr(
  { initial, receipt }: { initial: XChinaFlareSolverrState; receipt(message: string): void },
) {
  const [saved, setSaved] = useState(initial);
  const [enabled, setEnabled] = useState(initial.enabled);
  const [endpoint, setEndpoint] = useState('');
  const action = useAction();

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void action.run('save', (signal) => apiSend<XChinaFlareSolverrState>(
      '/api/configuration/xchina-flaresolverr', { enabled, endpoint }, 'POST', signal),
    (next) => { setSaved(next); setEndpoint(''); receipt('已保存 XChina 网络设置'); });
  };

  return (
    <Section id="xchinaFlareSolverr" title="XChina FlareSolverr" onSubmit={submit}>
      <Rows>
        <SettingsRow label="使用外部浏览器求解服务">
          <Switch aria-label="为 XChina 启用 FlareSolverr" isSelected={enabled}
            onChange={setEnabled} />
        </SettingsRow>
        {enabled ? <SettingsRow label="服务地址">
          <Input id="xchinaFlareSolverrEndpoint" type="password" label="FlareSolverr /v1 地址"
            autoComplete="off" spellCheck="false" value={endpoint} onChange={setEndpoint}
            placeholder={saved.endpoint_saved ? '已保存，留空保留' : 'http://flaresolverr:8191/v1'} />
        </SettingsRow> : null}
      </Rows>
      <Stack divided>
        <Note tone="neutral" title="仅在 Cloudflare 拦截 XChina 时使用">
          Peach 会先直接访问 XChina；验证页出现后才请求这个地址，并用返回的浏览器会话完成本次抓取。地址保存在本机 secrets 中。
        </Note>
        {action.error ? <ErrorText>{action.error}</ErrorText> : null}
      </Stack>
      <Footer>
        <Button type="submit" {...busyProps(action.busy === 'save')}>保存配置</Button>
      </Footer>
    </Section>
  );
}

export function PeachProxy({ initial, receipt }: { initial: PeachProxyState; receipt(message: string): void }) {
  const [saved, setSaved] = useState(initial);
  const [mode, setMode] = useState(initial.mode);
  const [address, setAddress] = useState('');
  const action = useAction();

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void action.run('save', (signal) => apiSend<PeachProxyState>('/api/configuration/peach-proxy', { mode, proxy: address }, 'POST', signal),
      (next) => { setSaved(next); setAddress(''); receipt('已保存配置'); });
  };

  return (
    <Section id="peachProxy" title="Peach 代理" onSubmit={submit}>
      <Rows>
        <SettingsRow label="连接方式">
          <ProxyModeSelect mode={mode} onChange={setMode} />
        </SettingsRow>
      </Rows>
      {mode === 'proxy' || saved.needs_selection || action.error ? (
        <Stack divided>
          {mode === 'proxy'
            ? <ProxyAddressField id="peachProxyAddress" value={address} onChange={setAddress} saved={saved.proxy_saved} />
            : null}
          {saved.needs_selection ? <Note tone="warning" title="需要选择连接方式">已有来源的代理地址不同，请选择公共连接方式。</Note> : null}
          {action.error ? <ErrorText>{action.error}</ErrorText> : null}
        </Stack>
      ) : null}
      <Footer>
        <Button type="submit" {...busyProps(action.busy === 'save')}>保存配置</Button>
      </Footer>
    </Section>
  );
}
