export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const globalForMetrics = globalThis;

function getMetrics() {
    if (!globalForMetrics.quickCartMetrics) {
        globalForMetrics.quickCartMetrics = {
            metricsRequestsTotal: 0,
        };
    }

    return globalForMetrics.quickCartMetrics;
}

function metricHelp(name, help) {
    return `# HELP ${name} ${help}\n# TYPE ${name} gauge`;
}

function counterHelp(name, help) {
    return `# HELP ${name} ${help}\n# TYPE ${name} counter`;
}

function formatLabels(labels) {
    const entries = Object.entries(labels);

    if (entries.length === 0) {
        return '';
    }

    const formatted = entries
        .map(([key, value]) => `${key}="${String(value).replaceAll('\\', '\\\\').replaceAll('"', '\\"')}"`)
        .join(',');

    return `{${formatted}}`;
}

function metric(name, value, labels = {}) {
    return `${name}${formatLabels(labels)} ${value}`;
}

export async function GET() {
    const metricsState = getMetrics();
    metricsState.metricsRequestsTotal += 1;

    const memoryUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();
    const startedAt = Math.round(Date.now() / 1000 - process.uptime());

    const body = [
        metricHelp('quickcart_app_info', 'QuickCart application information.'),
        metric('quickcart_app_info', 1, {
            node_version: process.version,
            environment: process.env.NODE_ENV || 'development',
        }),
        metricHelp('quickcart_process_uptime_seconds', 'Process uptime in seconds.'),
        metric('quickcart_process_uptime_seconds', process.uptime()),
        metricHelp('quickcart_process_start_time_seconds', 'Process start time as a Unix timestamp.'),
        metric('quickcart_process_start_time_seconds', startedAt),
        metricHelp('quickcart_process_resident_memory_bytes', 'Resident memory size in bytes.'),
        metric('quickcart_process_resident_memory_bytes', memoryUsage.rss),
        metricHelp('quickcart_nodejs_heap_size_total_bytes', 'Node.js heap size total in bytes.'),
        metric('quickcart_nodejs_heap_size_total_bytes', memoryUsage.heapTotal),
        metricHelp('quickcart_nodejs_heap_size_used_bytes', 'Node.js heap size used in bytes.'),
        metric('quickcart_nodejs_heap_size_used_bytes', memoryUsage.heapUsed),
        metricHelp('quickcart_nodejs_external_memory_bytes', 'Node.js external memory size in bytes.'),
        metric('quickcart_nodejs_external_memory_bytes', memoryUsage.external),
        counterHelp('quickcart_process_cpu_user_seconds_total', 'Total user CPU time spent in seconds.'),
        metric('quickcart_process_cpu_user_seconds_total', cpuUsage.user / 1000000),
        counterHelp('quickcart_process_cpu_system_seconds_total', 'Total system CPU time spent in seconds.'),
        metric('quickcart_process_cpu_system_seconds_total', cpuUsage.system / 1000000),
        counterHelp('quickcart_metrics_requests_total', 'Total number of Prometheus metrics scrape requests.'),
        metric('quickcart_metrics_requests_total', metricsState.metricsRequestsTotal),
    ].join('\n');

    return new Response(`${body}\n`, {
        headers: {
            'Content-Type': 'text/plain; version=0.0.4; charset=utf-8',
        },
    });
}
