# Reto Integrador — Insurance API (NestJS + Arquitectura Hexagonal)

Este proyecto es una API REST robusta diseñada bajo principios de **Arquitectura Hexagonal (Ports & Adapters)**, **SOLID**, **Clean Code** y aplicando **6 Patrones de Diseño del GoF**.

---

## 🛠️ Tecnologías Utilizadas (Stack) y Justificación

*   **NestJS & TypeScript**: NestJS proporciona un contenedor de Inversión de Control (IoC) nativo de primera clase, facilitando la inversión de dependencias (DIP) entre la capa de aplicación/dominio (Puertos) y la de infraestructura (Adaptadores). TypeScript provee tipado estático, permitiendo modelar dominios ricos con interfaces y polimorfismo robusto.
*   **PostgreSQL**: Motor de base de datos relacional robusto e ideal para la persistencia transaccional y consistente de pólizas de seguros y clientes.
*   **SQLite (Fallback)**: Base de datos en memoria sumamente ágil, integrada para ejecutar la aplicación de forma local instantánea (sin Docker).
*   **Apache Kafka**: Broker de eventos de alto rendimiento idóneo para implementar una arquitectura dirigida por eventos (EDA) desacoplada (Observer pattern) en microservicios reales.
*   **Kafka UI (Provectus)**: Interfaz gráfica web de administración para visualizar clústeres, tópicos, particiones y mensajes de Kafka.
*   **TypeORM**: Mapeador objeto-relacional (ORM) que permite persistir entidades mediante un esquema desacoplado y mapeadores bidireccionales (`Mappers`), aislando la base de datos de nuestro dominio transaccional.

---

## 🏛️ Descripción de la Arquitectura (Hexagonal)

La aplicación sigue estrictamente una estructura hexagonal dividida en capas aisladas:

```mermaid
graph TD
  subgraph Infraestructura (Adaptadores)
    A[PolicyController / REST] -->|Invoca| B
    E[TypeOrmPolicyRepositoryAdapter] -->|Implementa| D
    F[KafkaPublisherAdapter] -->|Implementa| G
  end
  subgraph Aplicación (Casos de Uso)
    B[CreatePolicyUseCase] -->|Consume| C
  end
  subgraph Dominio (Núcleo)
    C[Policy - Entidad]
    D[PolicyRepositoryPort - Puerto]
    G[EventPublisherPort - Puerto]
  end
  style C fill:#f9f,stroke:#333,stroke-width:2px
```

*   **Dominio (`domain/`)**: Contiene la lógica pura del negocio (entidades ricas, reglas e interfaces de puertos). Está completamente aislado: **no importa nada** de `@nestjs/common`, TypeORM, class-validator ni librerías de infraestructura.
*   **Aplicación (`application/`)**: Contiene los casos de uso (`Use Cases`) que implementan los flujos de negocio del sistema, interactuando únicamente con los puertos del dominio.
*   **Infraestructura (`infrastructure/`)**: Adaptadores específicos que interactúan con tecnologías externas (Bases de datos, endpoints REST, protocolos de eventos, etc.).

---

## 🚀 Pasos de Arranque con Docker Compose

Sigue estas instrucciones para levantar todo el entorno contenerizado sin necesidad de configurar dependencias locales en tu máquina:

### 1. Levantar el Entorno Completo
Abre tu terminal en la raíz del proyecto y ejecuta:
```bash
docker compose up --build
```
*Esto descargará, compilará e iniciará PostgreSQL, Zookeeper, Kafka, la interfaz de Kafka UI y el contenedor de la aplicación NestJS.*

### 2. Verificar las URLs de Acceso
Una vez que el inicio de contenedores finalice, podrás acceder a las siguientes interfaces:
*   **API REST & Swagger UI**: [http://localhost:3000/api/docs](http://localhost:3000/api/docs) (Interfaz interactiva para consultar y ejecutar llamadas al API).
*   **UI del Broker (Kafka UI)**: [http://localhost:8080](http://localhost:8080) (Panel visual para inspeccionar tópicos como `policy.issued`, mensajes, y consumidores de Kafka).

### 3. Apagar los Contenedores
Para detener y limpiar el entorno de contenedores y sus volúmenes asociados, ejecuta:
```bash
docker compose down -v
```

---

## 🗺️ Mapa Explícito de los 6 Patrones de Diseño

A continuación se detalla la ubicación física en el código de cada patrón implementado:

| Patrón | Archivo del Puerto / Definición | Implementación Concreta / Uso |
| :--- | :--- | :--- |
| **1. Factory Method** | [`policy-factory.port.ts`](file:///D:/SofkaUcanteras/Policy/src/policies/domain/ports/policy-factory.port.ts) | [`concrete-policy-factories.ts`](file:///D:/SofkaUcanteras/Policy/src/policies/domain/factories/concrete-policy-factories.ts) (`AutoPolicyFactory`, `LifePolicyFactory`, `HomePolicyFactory`, `HealthPolicyFactory`). Resueltos dinámicamente mediante un `Map` en [`policies.module.ts`](file:///D:/SofkaUcanteras/Policy/src/policies/policies.module.ts). |
| **2. Strategy** | [`rating-strategy.port.ts`](file:///D:/SofkaUcanteras/Policy/src/policies/domain/ports/rating-strategy.port.ts) | [`concrete-rating-strategies.ts`](file:///D:/SofkaUcanteras/Policy/src/policies/domain/strategies/concrete-rating-strategies.ts) (`StandardStrategy`, `RiskBasedStrategy`, `LoyaltyStrategy`). Inyectadas y resueltas vía `Map` dinámico para respetar OCP. |
| **3. Builder** | *Definición en Aplicación* | [`policy.builder.ts`](file:///D:/SofkaUcanteras/Policy/src/policies/application/builders/policy.builder.ts) (`PolicyBuilder`). Ensambla y valida de forma fluida el agregado `Policy` obligando al estado inicial `QUOTED`. |
| **4. State** | [`policy-state.port.ts`](file:///D:/SofkaUcanteras/Policy/src/policies/domain/ports/policy-state.port.ts) | [`policy-states.ts`](file:///D:/SofkaUcanteras/Policy/src/policies/domain/states/policy-states.ts) (`QuotedState`, `IssuedState`, `ActiveState`, `SuspendedState`, `CancelledState`). Integrado por delegación en la entidad [`policy.domain.ts`](file:///D:/SofkaUcanteras/Policy/src/policies/domain/policy.domain.ts). |
| **5. Observer** | [`event-publisher.port.ts`](file:///D:/SofkaUcanteras/Policy/src/shared/events/domain/ports/event-publisher.port.ts) | [`kafka-publisher.adapter.ts`](file:///D:/SofkaUcanteras/Policy/src/shared/events/infrastructure/adapters/kafka-publisher.adapter.ts) (emisor) y los consumidores asíncronos [`notifications.consumer.ts`](file:///D:/SofkaUcanteras/Policy/src/notifications/infrastructure/consumers/notifications.consumer.ts) y [`audit.consumer.ts`](file:///D:/SofkaUcanteras/Policy/src/notifications/infrastructure/consumers/audit.consumer.ts) (suscritos a Kafka). |
| **6. Singleton** | *Contenedor IoC de NestJS* | [`policy-number-sequencer.ts`](file:///D:/SofkaUcanteras/Policy/src/policies/application/sequencer/policy-number-sequencer.ts) (`PolicyNumberSequencer`). |

---

## 🔍 Investigación del Patrón Singleton (`PolicyNumberSequencer`)

### 1. Por qué se implementó
El sistema requiere generar identificadores correlativos y atómicos legibles del formato `POL-YYYY-XXXXXX` (ej. `POL-2026-000001`) para cada póliza cotizada. Si múltiples instancias de este secuenciador existieran simultáneamente, se podrían duplicar números de póliza, rompiendo la consistencia del negocio y provocando fallos por clave primaria duplicada en la base de datos.

### 2. Cómo se implementó
Aprovechamos el ciclo de vida por defecto de NestJS llamado **`Scope.DEFAULT`**. Cuando decoramos a [`PolicyNumberSequencer`](file:///D:/SofkaUcanteras/Policy/src/policies/application/sequencer/policy-number-sequencer.ts) con `@Injectable()`, el contenedor de inversión de control de NestJS crea e inyecta una **única instancia compartida en memoria** para toda la aplicación.
*   **Código de generación atómica**:
    ```typescript
    @Injectable() // Por defecto es Scope.DEFAULT (Singleton)
    export class PolicyNumberSequencer {
      private currentSeq = 0;
      public getNext(): string {
        this.currentSeq += 1;
        const year = new Date().getFullYear();
        const padded = String(this.currentSeq).padStart(6, '0');
        return `POL-${year}-${padded}`;
      }
    }
    ```

### 3. Qué riesgo se mitigó
*   **Colisiones Concurrentes**: En entornos web, múltiples usuarios pueden solicitar cotizaciones al mismo tiempo. Al centralizar la secuencia en un componente Singleton, garantizamos que el incremento de la variable sea único por cada llamada al método `.getNext()`.
*   **Integridad de Persistencia**: Evitamos errores de inserción de filas duplicadas en la base de datos relacional y aseguramos que la secuencia lógica no sufra de desfases por lecturas sucias en base de datos.
